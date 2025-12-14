import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getTagsForPosts } from '@/lib/tags';

// GET /api/circles/[id]/posts - Get posts in a circle
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { id } = await params;
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);

    // Check if circle exists
    const { data: circle, error: circleError } = await supabaseAdmin
      .from('circles')
      .select('*')
      .eq('id', id)
      .single();

    if (circleError || !circle) {
      return NextResponse.json(
        { error: 'Circle not found' },
        { status: 404 }
      );
    }

    // Get post IDs in this circle
    const { data: circlePostLinks, error: linksError } = await supabaseAdmin
      .from('circle_posts')
      .select('post_id')
      .eq('circle_id', id)
      .limit(limit);

    if (linksError) {
      return NextResponse.json({ error: linksError.message }, { status: 500 });
    }

    const postIds = circlePostLinks?.map(cp => cp.post_id) || [];

    if (postIds.length === 0) {
      return NextResponse.json({
        circle,
        posts: [],
        next_cursor: null
      });
    }

    // Get the actual posts
    const { data: posts, error: postsError } = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_icon)
      `)
      .in('id', postIds)
      .eq('is_flagged', false)
      .order('created_at', { ascending: false });

    if (postsError) {
      return NextResponse.json({ error: postsError.message }, { status: 500 });
    }

    // Fetch tags for all posts
    const tagsByPost = await getTagsForPosts(postIds);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enrichedPosts = (posts || []).map((post: any) => ({
      ...post,
      tags: tagsByPost[post.id] || []
    }));

    return NextResponse.json({
      circle,
      posts: enrichedPosts,
      next_cursor: posts && posts.length === limit ? posts[posts.length - 1].created_at : null
    });

  } catch (error) {
    console.error('Get circle posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
