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

// POST /api/messages/respond - Accept or reject a message request
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
    const { request_id, sender_id, action } = await request.json();

    if (!action || !['accept', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be "accept" or "reject"' },
        { status: 400 }
      );
    }

    // Find the request
    let query = supabase
      .from('message_requests')
      .select('*')
      .eq('receiver_id', user.id)
      .eq('status', 'pending');

    if (request_id) {
      query = query.eq('id', request_id);
    } else if (sender_id) {
      query = query.eq('sender_id', sender_id);
    } else {
      return NextResponse.json(
        { error: 'Request ID or sender ID is required' },
        { status: 400 }
      );
    }

    const { data: messageRequest, error: findError } = await query.single();

    if (findError || !messageRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    const newStatus = action === 'accept' ? 'accepted' : 'rejected';

    // Update the request
    const { error: updateError } = await supabase
      .from('message_requests')
      .update({ status: newStatus })
      .eq('id', messageRequest.id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update request' },
        { status: 500 }
      );
    }

    // If accepted, create reverse request as well
    if (action === 'accept') {
      await supabase
        .from('message_requests')
        .upsert({
          sender_id: user.id,
          receiver_id: messageRequest.sender_id,
          status: 'accepted'
        }, {
          onConflict: 'sender_id,receiver_id'
        });

      // Notify the sender
      const { data: responder } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single();

      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: messageRequest.sender_id,
          type: 'message',
          reference_id: user.id,
          actor_id: user.id,
          message: `${responder?.username || 'Someone'} accepted your message request`,
          is_read: false
        });
    }

    return NextResponse.json({
      success: true,
      status: newStatus,
      message: action === 'accept' 
        ? 'Request accepted! You can now message each other.' 
        : 'Request rejected.'
    });

  } catch (error) {
    console.error('Respond to request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/messages/respond - Get pending message requests
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

    // Get pending requests where user is the receiver
    const { data: requests, error } = await supabase
      .from('message_requests')
      .select(`
        *,
        sender:sender_id (id, username, avatar_icon, bio)
      `)
      .eq('receiver_id', user.id)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      requests: requests || []
    });

  } catch (error) {
    console.error('Get requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
