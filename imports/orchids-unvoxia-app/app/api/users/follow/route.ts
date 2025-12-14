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

// POST /api/users/follow - Follow/unfollow a user
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

    // Can't follow yourself
    if (targetUserId === user.id) {
      return NextResponse.json(
        { error: 'You cannot follow yourself' },
        { status: 400 }
      );
    }

    // Check if target user exists
    const { data: targetUser, error: targetError } = await supabase
      .from('users')
      .select('id, username')
      .eq('id', targetUserId)
      .single();

    if (targetError || !targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already following
    const { data: existingFollow } = await supabase
      .from('follows')
      .select('*')
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId)
      .single();

    if (existingFollow) {
      // Unfollow
      const { error: deleteError } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId);

      if (deleteError) {
        return NextResponse.json(
          { error: 'Failed to unfollow' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        following: false,
        message: `Unfollowed ${targetUser.username}`
      });
    }

    // Follow
    const { error: insertError } = await supabase
      .from('follows')
      .insert({
        follower_id: user.id,
        following_id: targetUserId
      });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to follow' },
        { status: 500 }
      );
    }

    // Create notification for followed user
    const { data: follower } = await supabase
      .from('users')
      .select('username')
      .eq('id', user.id)
      .single();

    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: targetUserId,
        type: 'follow',
        reference_id: user.id,
        actor_id: user.id,
        message: `${follower?.username || 'Someone'} started following you`,
        is_read: false
      });

    return NextResponse.json({
      success: true,
      following: true,
      message: `Now following ${targetUser.username}`
    });

  } catch (error) {
    console.error('Follow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/users/follow - Get followers/following lists
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const username = searchParams.get('username');
    const type = searchParams.get('type') || 'followers'; // followers or following
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const cursor = searchParams.get('cursor');

    // Get target user ID
    let targetUserId = user_id;

    if (!targetUserId && username) {
      const { data: targetUser } = await supabaseAdmin
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

    if (type === 'following') {
      // Get users this person follows
      let query = supabaseAdmin
        .from('follows')
        .select(`
          following_id,
          created_at,
          users:following_id (id, username, avatar_icon, bio)
        `)
        .eq('follower_id', targetUserId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (cursor) {
        query = query.lt('created_at', cursor);
      }

      const { data: follows, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        users: follows?.map(f => f.users) || [],
        next_cursor: follows && follows.length === limit ? follows[follows.length - 1].created_at : null
      });
    } else {
      // Get followers
      let query = supabaseAdmin
        .from('follows')
        .select(`
          follower_id,
          created_at,
          users:follower_id (id, username, avatar_icon, bio)
        `)
        .eq('following_id', targetUserId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (cursor) {
        query = query.lt('created_at', cursor);
      }

      const { data: follows, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        users: follows?.map(f => f.users) || [],
        next_cursor: follows && follows.length === limit ? follows[follows.length - 1].created_at : null
      });
    }

  } catch (error) {
    console.error('Get follows error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
