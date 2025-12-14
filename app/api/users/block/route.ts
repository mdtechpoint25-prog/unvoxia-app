import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from '@/lib/supabase';

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

// POST /api/users/block - Block a user
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
    const { user_id, username } = await request.json();

    // Get target user ID
    let targetUserId = user_id;

    if (!targetUserId && username) {
      const { data: targetUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', username.toLowerCase())
        .single();

      if (targetUser) {
        targetUserId = targetUser.id;
      }
    }

    if (!targetUserId) {
      return NextResponse.json(
        { error: 'User ID or username is required' },
        { status: 400 }
      );
    }

    // Can't block yourself
    if (targetUserId === user.id) {
      return NextResponse.json(
        { error: 'You cannot block yourself' },
        { status: 400 }
      );
    }

    // Check if already blocked
    const { data: existingBlock } = await supabase
      .from('blocked_users')
      .select('*')
      .eq('blocker_id', user.id)
      .eq('blocked_id', targetUserId)
      .single();

    if (existingBlock) {
      // Unblock
      const { error: deleteError } = await supabase
        .from('blocked_users')
        .delete()
        .eq('blocker_id', user.id)
        .eq('blocked_id', targetUserId);

      if (deleteError) {
        return NextResponse.json(
          { error: 'Failed to unblock user' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        blocked: false,
        message: 'User unblocked'
      });
    }

    // Block user
    const { error: insertError } = await supabase
      .from('blocked_users')
      .insert({
        blocker_id: user.id,
        blocked_id: targetUserId
      });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to block user' },
        { status: 500 }
      );
    }

    // Also unfollow if following
    await supabase
      .from('follows')
      .delete()
      .or(`and(follower_id.eq.${user.id},following_id.eq.${targetUserId}),and(follower_id.eq.${targetUserId},following_id.eq.${user.id})`);

    // Remove any message requests
    await supabase
      .from('message_requests')
      .delete()
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${targetUserId}),and(sender_id.eq.${targetUserId},receiver_id.eq.${user.id})`);

    return NextResponse.json({
      success: true,
      blocked: true,
      message: 'User blocked. You will no longer see their content.'
    });

  } catch (error) {
    console.error('Block user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/users/block - Get blocked users list
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

    const { data: blockedUsers, error } = await supabase
      .from('blocked_users')
      .select(`
        blocked_id,
        created_at,
        users:blocked_id (id, username, avatar_icon)
      `)
      .eq('blocker_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      blocked_users: blockedUsers?.map(b => ({
        ...b.users,
        blocked_at: b.created_at
      })) || []
    });

  } catch (error) {
    console.error('Get blocked users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
