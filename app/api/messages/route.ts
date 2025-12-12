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
  sender: { username: string; avatar_url: string | null } | null;
  receiver: { username: string; avatar_url: string | null } | null;
}

// Get list of conversations
export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
      
      if (!conversationsMap.has(partnerId)) {
        conversationsMap.set(partnerId, {
          partnerId,
          partnerUsername: partner?.username || 'Anonymous',
          partnerAvatar: partner?.avatar_url,
          lastMessage: msg.content,
          lastMessageAt: msg.created_at,
          unreadCount: 0
        });
      }
      
      // Count unread messages
      if (msg.receiver_id === user.userId && !msg.read) {
        const conv = conversationsMap.get(partnerId);
        conv.unreadCount++;
      }
    }

    const conversations = Array.from(conversationsMap.values());

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Initiate a new conversation (with consent check)
export async function POST(request: Request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiverUsername, content } = await request.json();

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

    // Check if there's an existing conversation (mutual consent)
    const { data: existingChat } = await supabase
      .from('messages')
      .select('id')
      .or(`and(sender_id.eq.${user.userId},receiver_id.eq.${receiver.id}),and(sender_id.eq.${receiver.id},receiver_id.eq.${user.userId})`)
      .limit(1);

    // Create message
    const { data: message, error: msgError } = await supabase
      .from('messages')
      .insert({
        sender_id: user.userId,
        receiver_id: receiver.id,
        content: content.trim(),
        media_url: null
      } as any)
      .select()
      .single();

    if (msgError) {
      console.error('Send message error:', msgError);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message,
      isNewConversation: !existingChat || existingChat.length === 0
    });
  } catch (error) {
    console.error('Messages POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
