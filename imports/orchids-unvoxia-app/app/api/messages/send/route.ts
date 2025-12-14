import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// Helper to get user from auth header
async function getAuthUser(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }

  return { user, supabase };
}

// POST /api/messages/send - Send a message
export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const auth = await getAuthUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { user, supabase } = auth;
    const { receiver_id, content } = await request.json();

    if (!receiver_id) {
      return NextResponse.json(
        { error: 'Receiver ID is required' },
        { status: 400 }
      );
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be 1000 characters or less' },
        { status: 400 }
      );
    }

    // Check if messaging is approved
    const { data: approval } = await supabase
      .from('message_requests')
      .select('status')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiver_id}),and(sender_id.eq.${receiver_id},receiver_id.eq.${user.id})`)
      .eq('status', 'accepted')
      .single();

    if (!approval) {
      return NextResponse.json(
        { error: 'You need permission to message this user' },
        { status: 403 }
      );
    }

    // Send message
    const { data: message, error: insertError } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id,
        content: content.trim(),
        is_read: false
      })
      .select()
      .single();

    if (insertError || !message) {
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Create notification
    const { data: sender } = await supabase
      .from('users')
      .select('username')
      .eq('id', user.id)
      .single();

    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: receiver_id,
        type: 'message',
        reference_id: message.id,
        actor_id: user.id,
        message: `New message from ${sender?.username || 'someone'}`,
        is_read: false
      });

    return NextResponse.json({
      success: true,
      message
    }, { status: 201 });

  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/messages/send - Get conversation with a user
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const auth = await getAuthUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { user, supabase } = auth;
    const { searchParams } = new URL(request.url);
    const partner_id = searchParams.get('partner_id');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const cursor = searchParams.get('cursor');

    if (!partner_id) {
      // Return list of conversations
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (id, username, avatar_icon),
          receiver:receiver_id (id, username, avatar_icon)
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Group by conversation partner
      const conversations: Record<string, {
        partner: { id: string; username: string; avatar_icon: string };
        last_message: {
          content: string;
          created_at: string;
          is_read: boolean;
          sender_id: string;
        };
        unread_count: number;
      }> = {};

      messages?.forEach(msg => {
        const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        const partner = msg.sender_id === user.id ? msg.receiver : msg.sender;

        if (!conversations[partnerId]) {
          conversations[partnerId] = {
            partner,
            last_message: {
              content: msg.content,
              created_at: msg.created_at,
              is_read: msg.is_read,
              sender_id: msg.sender_id
            },
            unread_count: 0
          };
        }

        if (!msg.is_read && msg.receiver_id === user.id) {
          conversations[partnerId].unread_count++;
        }
      });

      return NextResponse.json({
        conversations: Object.values(conversations)
      });
    }

    // Get messages with specific partner
    let query = supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${partner_id}),and(sender_id.eq.${partner_id},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data: messages, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Mark messages as read
    await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('sender_id', partner_id)
      .eq('receiver_id', user.id)
      .eq('is_read', false);

    return NextResponse.json({
      messages: messages?.reverse() || [],
      next_cursor: messages && messages.length === limit ? messages[messages.length - 1].created_at : null
    });

  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
