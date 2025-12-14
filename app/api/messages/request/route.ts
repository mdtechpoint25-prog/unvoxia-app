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

// POST /api/messages/request - Request permission to message someone
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
    const { receiver_id, receiver_username } = await request.json();

    // Get receiver ID from username if not provided
    let targetUserId = receiver_id;

    if (!targetUserId && receiver_username) {
      const { data: targetUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', receiver_username.toLowerCase())
        .single();

      if (targetUser) {
        targetUserId = targetUser.id;
      }
    }

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'Receiver ID or username is required' },
        { status: 400 }
      );
    }

    // Can't message yourself
    if (targetUserId === user.id) {
      return NextResponse.json(
        { error: 'You cannot message yourself' },
        { status: 400 }
      );
    }

    // Check if receiver exists and allows messages
    const { data: receiver, error: receiverError } = await supabase
      .from('users')
      .select('id, username, allow_messages')
      .eq('id', targetUserId)
      .single();

    if (receiverError || !receiver) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!receiver.allow_messages) {
      return NextResponse.json(
        { error: 'This user has disabled messages' },
        { status: 403 }
      );
    }

    // Check if blocked
    const { data: blocked } = await supabase
      .from('blocked_users')
      .select('*')
      .or(`blocker_id.eq.${targetUserId},blocker_id.eq.${user.id}`)
      .or(`blocked_id.eq.${targetUserId},blocked_id.eq.${user.id}`)
      .single();

    if (blocked) {
      return NextResponse.json(
        { error: 'Unable to send message request' },
        { status: 403 }
      );
    }

    // Check for existing request
    const { data: existingRequest } = await supabase
      .from('message_requests')
      .select('*')
      .eq('sender_id', user.id)
      .eq('receiver_id', targetUserId)
      .single();

    if (existingRequest) {
      return NextResponse.json({
        success: true,
        status: existingRequest.status,
        message: `Request already ${existingRequest.status}`
      });
    }

    // Check if they already sent us a request (auto-accept)
    const { data: reverseRequest } = await supabase
      .from('message_requests')
      .select('*')
      .eq('sender_id', targetUserId)
      .eq('receiver_id', user.id)
      .single();

    if (reverseRequest && reverseRequest.status === 'pending') {
      // Auto-accept both ways
      await supabase
        .from('message_requests')
        .update({ status: 'accepted' })
        .eq('id', reverseRequest.id);

      await supabase
        .from('message_requests')
        .insert({
          sender_id: user.id,
          receiver_id: targetUserId,
          status: 'accepted'
        });

      return NextResponse.json({
        success: true,
        status: 'accepted',
        message: 'You can now message each other!'
      });
    }

    // Create new request
    const { error: insertError } = await supabase
      .from('message_requests')
      .insert({
        sender_id: user.id,
        receiver_id: targetUserId,
        status: 'pending'
      });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to send request' },
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
        user_id: targetUserId,
        type: 'message',
        reference_id: user.id,
        actor_id: user.id,
        message: `${sender?.username || 'Someone'} wants to message you`,
        is_read: false
      });

    return NextResponse.json({
      success: true,
      status: 'pending',
      message: 'Request sent! They will be notified.'
    }, { status: 201 });

  } catch (error) {
    console.error('Message request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
