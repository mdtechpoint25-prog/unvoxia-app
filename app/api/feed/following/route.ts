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

// GET /api/feed/following - Get posts from followed users
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
        { error: 'Unauthorized - Please sign in to see your following feed' },
        { status: 401 }
      );
    }

    const { user } = auth;
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const cursor = searchParams.get('cursor');

    // Get users they follow
    const { data: following } = await supabaseAdmin
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id);

    const followingIds = following?.map(f => f.following_id) || [];

    if (followingIds.length === 0) {
      return NextResponse.json({
        posts: [],
        next_cursor: null,
        message: 'Follow some users to see their posts here!'
      });
    }

    // Get blocked users
    const { data: blockedUsers } = await supabaseAdmin
      .from('blocked_users')
      .select('blocked_id')
      .eq('blocker_id', user.id);

    const blockedIds = blockedUsers?.map(b => b.blocked_id) || [];
    const filteredFollowingIds = followingIds.filter(id => !blockedIds.includes(id));

    // Get posts from followed users
    let query = supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_icon)
      `)
      .eq('is_flagged', false)
      .in('user_id', filteredFollowingIds)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data: posts, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fetch tags for all posts
    const postIds = posts?.map(p => p.id) || [];
    
    // Get post_tags with tag_id, then get tags separately
    const { data: postTagLinks } = await supabaseAdmin
      .from('post_tags')
      .select('post_id, tag_id')
      .in('post_id', postIds);

    // Get unique tag IDs
    const tagIds = [...new Set(postTagLinks?.map(pt => pt.tag_id) || [])];
    
    // Fetch tag names
    const { data: tagData } = tagIds.length > 0 
      ? await supabaseAdmin.from('tags').select('id, name').in('id', tagIds)
      : { data: [] };
    
    const tagMap = new Map(tagData?.map(t => [t.id, t.name]) || []);

    const tagsByPost: Record<string, string[]> = {};
    postTagLinks?.forEach((pt) => {
      if (!tagsByPost[pt.post_id]) {
        tagsByPost[pt.post_id] = [];
      }
      const tagName = tagMap.get(pt.tag_id);
      if (tagName) tagsByPost[pt.post_id].push(tagName);
    });

    // Check if user has reacted to these posts
    const { data: reactions } = await supabaseAdmin
      .from('reactions')
      .select('post_id')
      .eq('user_id', user.id)
      .in('post_id', postIds);

    const reactedPostIds = new Set(reactions?.map(r => r.post_id) || []);

    const enrichedPosts = posts?.map(post => ({
      ...post,
      tags: tagsByPost[post.id] || [],
      has_reacted: reactedPostIds.has(post.id),
      is_following: true
    })) || [];

    return NextResponse.json({
      posts: enrichedPosts,
      next_cursor: posts && posts.length === limit ? posts[posts.length - 1].created_at : null
    });

  } catch (error) {
    console.error('Following feed error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
