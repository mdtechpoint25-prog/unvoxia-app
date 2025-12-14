import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getTagsForPosts } from '@/lib/tags';

// GET /api/users/[username] - Get user profile by username
export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { username } = await params;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('id, username, bio, avatar_icon, created_at')
      .eq('username', username.toLowerCase())
      .eq('is_active', true)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get follower/following/post counts
    const [followersResult, followingResult, postsResult] = await Promise.all([
      supabaseAdmin.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', profile.id),
      supabaseAdmin.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', profile.id),
      supabaseAdmin.from('posts').select('*', { count: 'exact', head: true }).eq('user_id', profile.id).eq('is_flagged', false)
    ]);

    // Get recent posts
    const { data: recentPosts } = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('user_id', profile.id)
      .eq('is_flagged', false)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get tags for posts
    const postIds = recentPosts?.map(p => p.id) || [];
    const tagsByPost = await getTagsForPosts(postIds);

    const enrichedPosts = recentPosts?.map(post => ({
      ...post,
      tags: tagsByPost[post.id] || []
    })) || [];

    return NextResponse.json({
      id: profile.id,
      username: profile.username,
      bio: profile.bio,
      avatar_icon: profile.avatar_icon,
      created_at: profile.created_at,
      stats: {
        followers: followersResult.count || 0,
        following: followingResult.count || 0,
        posts: postsResult.count || 0
      },
      recent_posts: enrichedPosts
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
