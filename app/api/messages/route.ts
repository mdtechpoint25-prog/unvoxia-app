import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function getUserFromSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    if (decoded.exp < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}

interface MessageRow {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  is_anonymous: boolean;
  sender: { username: string; avatar_url: string | null } | null;
  receiver: { username: string; avatar_url: string | null } | null;
}

// Get list of conversations and pending chat requests
export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get pending chat requests received
    const { data: pendingRequests } = await supabase
      .from('chat_requests')
      .select(`
        id,
        requester_id,
        message,
        created_at,
        requester:requester_id (username, avatar_url)
      `)
      .eq('recipient_id', user.userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    // Get accepted conversations (where chat request was accepted)
    const { data: acceptedRequests } = await supabase
      .from('chat_requests')
      .select('requester_id, recipient_id')
      .or(`requester_id.eq.${user.userId},recipient_id.eq.${user.userId}`)
      .eq('status', 'accepted');

    const acceptedPartners = new Set<string>();
    acceptedRequests?.forEach(req => {
      if (req.requester_id === user.userId) {
        acceptedPartners.add(req.recipient_id);
      } else {
        acceptedPartners.add(req.requester_id);
      }
    });

    // Get all conversations where user is sender or receiver
    const { data, error } = await supabase
      .from('messages')
      .select(`
        id,
        sender_id,
        receiver_id,
        content,
        created_at,
        read,
        is_anonymous,
        sender:sender_id (username, avatar_url),
        receiver:receiver_id (username, avatar_url)
      `)
      .or(`sender_id.eq.${user.userId},receiver_id.eq.${user.userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch messages error:', error);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }

    const messages = data as unknown as MessageRow[];

    // Group messages by conversation partner
    const conversationsMap = new Map();
    
    for (const msg of messages || []) {
      const partnerId = msg.sender_id === user.userId ? msg.receiver_id : msg.sender_id;
      const partner = msg.sender_id === user.userId ? msg.receiver : msg.sender;
      
      // Only show conversations with accepted partners
      if (!acceptedPartners.has(partnerId)) continue;
      
      if (!conversationsMap.has(partnerId)) {
        conversationsMap.set(partnerId, {
          partnerId,
          partnerUsername: partner?.username || 'Anonymous',
          partnerAvatar: partner?.avatar_url,
          lastMessage: msg.content,
          lastMessageAt: msg.created_at,
          unreadCount: 0,
          isAnonymous: msg.is_anonymous
        });
      }
      
      // Count unread messages
      if (msg.receiver_id === user.userId && !msg.read) {
        const conv = conversationsMap.get(partnerId);
        conv.unreadCount++;
      }
    }

    const conversations = Array.from(conversationsMap.values());

    return NextResponse.json({ 
      conversations,
      pendingRequests: pendingRequests || []
    });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Send a chat request or message
export async function POST(request: Request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiverUsername, content, isAnonymous } = await request.json();

    if (!receiverUsername || !content?.trim()) {
      return NextResponse.json({ error: 'Receiver and content are required' }, { status: 400 });
    }

    // Find receiver by username
    const { data: receiver, error: receiverError } = await supabase
      .from('users')
      .select('id')
      .eq('username', receiverUsername)
      .single();

    if (receiverError || !receiver) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (receiver.id === user.userId) {
      return NextResponse.json({ error: 'Cannot message yourself' }, { status: 400 });
    }

    // Check if there's an existing accepted chat request
    const { data: existingRequest } = await supabase
      .from('chat_requests')
      .select('id, status')
      .or(`and(requester_id.eq.${user.userId},recipient_id.eq.${receiver.id}),and(requester_id.eq.${receiver.id},recipient_id.eq.${user.userId})`)
      .single();

    if (!existingRequest) {
      // No existing request - create a new chat request
      const { error: requestError } = await supabase
        .from('chat_requests')
        .insert({
          requester_id: user.userId,
          recipient_id: receiver.id,
          message: content.trim(),
          status: 'pending'
        });

      if (requestError) {
        // Check if it's a unique constraint violation (request already exists)
        if (requestError.code === '23505') {
          return NextResponse.json({ error: 'Chat request already sent' }, { status: 400 });
        }
        console.error('Create chat request error:', requestError);
        return NextResponse.json({ error: 'Failed to send chat request' }, { status: 500 });
      }

      // Create notification for recipient
      await supabase.from('notifications').insert({
        user_id: receiver.id,
        type: 'chat_request',
        title: 'New Chat Request',
        message: `${user.username} wants to connect with you`,
        link: '/messages'
      });

      return NextResponse.json({
        ok: true,
        type: 'request_sent',
        message: 'Chat request sent! They will need to accept before you can chat.'
      });
    }

    if (existingRequest.status === 'pending') {
      return NextResponse.json({ 
        error: 'Chat request is still pending. Please wait for them to accept.',
        type: 'pending'
      }, { status: 400 });
    }

    if (existingRequest.status === 'declined') {
      return NextResponse.json({ 
        error: 'This user has declined your chat request.',
        type: 'declined'
      }, { status: 400 });
    }

    // Chat request is accepted - send the message
    const { data: message, error: msgError } = await supabase
      .from('messages')
      .insert({
        sender_id: user.userId,
        receiver_id: receiver.id,
        content: content.trim(),
        is_anonymous: isAnonymous || false
      })
      .select()
      .single();

    if (msgError) {
      console.error('Send message error:', msgError);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      type: 'message_sent',
      message
    });
  } catch (error) {
    console.error('Messages POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

