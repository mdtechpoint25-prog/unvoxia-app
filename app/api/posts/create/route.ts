import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { getTagsForPosts } from '@/lib/tags';

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

// POST /api/posts - Create a new post
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
    const { content, post_type, tags, allow_comments, circle_id } = await request.json();

    // Validate content
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (content.length > 1500) {
      return NextResponse.json(
        { error: 'Content must be 1500 characters or less' },
        { status: 400 }
      );
    }

    // Validate post_type
    const validTypes = ['experience', 'question', 'advice', 'release'];
    const type = validTypes.includes(post_type) ? post_type : 'experience';

    // Create the post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        content: content.trim(),
        post_type: type,
        allow_comments: allow_comments !== false,
        is_anonymous: true,
        view_count: 0,
        reaction_count: 0,
        comment_count: 0,
        share_count: 0,
        is_flagged: false
      })
      .select()
      .single();

    if (postError || !post) {
      console.error('Post creation error:', postError);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }

    // Handle tags if provided
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const tagPromises = tags.slice(0, 5).map(async (tagName: string) => {
        const normalizedTag = tagName.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
        if (!normalizedTag) return null;

        // Upsert tag
        const { data: existingTag } = await supabaseAdmin
          .from('tags')
          .select('id, usage_count')
          .eq('name', normalizedTag)
          .single();

        let tagId: number;

        if (existingTag) {
          tagId = existingTag.id;
          // Increment usage count
          await supabaseAdmin
            .from('tags')
            .update({ usage_count: (existingTag.usage_count || 0) + 1 })
            .eq('id', tagId);
        } else {
          const { data: newTag } = await supabaseAdmin
            .from('tags')
            .insert({ name: normalizedTag, usage_count: 1 })
            .select('id')
            .single();
          
          if (newTag) {
            tagId = newTag.id;
          } else {
            return null;
          }
        }

        // Link post to tag
        await supabaseAdmin
          .from('post_tags')
          .insert({ post_id: post.id, tag_id: tagId });

        return normalizedTag;
      });

      await Promise.all(tagPromises);
    }

    // Link to circle if provided
    if (circle_id) {
      await supabaseAdmin
        .from('circle_posts')
        .insert({ circle_id, post_id: post.id });
    }

    // Fetch the complete post with tags
    const { data: completePost } = await supabase
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_icon)
      `)
      .eq('id', post.id)
      .single();

    // Get tags for the post
    const tagsByPost = await getTagsForPosts([post.id]);

    return NextResponse.json({
      success: true,
      post: {
        ...completePost,
        tags: tagsByPost[post.id] || []
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/posts - Get posts (general listing)
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const cursor = searchParams.get('cursor');
    const type = searchParams.get('type');
    const tag = searchParams.get('tag');

    let query = supabaseAdmin
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_icon)
      `)
      .eq('is_flagged', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    if (type && ['experience', 'question', 'advice', 'release'].includes(type)) {
      query = query.eq('post_type', type);
    }

    const { data: posts, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Fetch tags for all posts
    const postIds = posts?.map(p => p.id) || [];
    const tagsByPost = await getTagsForPosts(postIds);

    // Filter by tag if specified
    let filteredPosts = posts || [];
    if (tag) {
      filteredPosts = filteredPosts.filter(p => 
        tagsByPost[p.id]?.includes(tag.toLowerCase())
      );
    }

    const enrichedPosts = filteredPosts.map(post => ({
      ...post,
      tags: tagsByPost[post.id] || []
    }));

    return NextResponse.json({
      posts: enrichedPosts,
      next_cursor: posts && posts.length === limit ? posts[posts.length - 1].created_at : null
    });

  } catch (error) {
    console.error('Get posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
