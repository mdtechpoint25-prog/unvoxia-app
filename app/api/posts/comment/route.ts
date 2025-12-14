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

// POST /api/posts/comment - Add a comment to a post
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
    const { post_id, content } = await request.json();

    if (!post_id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      );
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: 'Comment must be 500 characters or less' },
        { status: 400 }
      );
    }

    // Check if post exists and allows comments
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id, user_id, allow_comments')
      .eq('id', post_id)
      .eq('is_flagged', false)
      .single();

    if (postError || !post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    if (!post.allow_comments) {
      return NextResponse.json(
        { error: 'Comments are disabled for this post' },
        { status: 403 }
      );
    }

    // Check if user's commenting is allowed
    const { data: userSettings } = await supabase
      .from('users')
      .select('allow_comments')
      .eq('id', post.user_id)
      .single();

    if (userSettings && !userSettings.allow_comments) {
      return NextResponse.json(
        { error: 'This user has disabled comments' },
        { status: 403 }
      );
    }

    // Create comment
    const { data: comment, error: insertError } = await supabase
      .from('comments')
      .insert({
        post_id,
        user_id: user.id,
        content: content.trim(),
        is_pinned: false,
        is_flagged: false
      })
      .select(`
        *,
        users:user_id (username, avatar_icon)
      `)
      .single();

    if (insertError || !comment) {
      return NextResponse.json(
        { error: 'Failed to add comment' },
        { status: 500 }
      );
    }

    // Create notification for post author (if not self)
    if (post.user_id !== user.id) {
      const { data: commenter } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single();

      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: post.user_id,
          type: 'comment',
          reference_id: post_id,
          actor_id: user.id,
          message: `${commenter?.username || 'Someone'} commented on your post`,
          is_read: false
        });
    }

    return NextResponse.json({
      success: true,
      comment
    }, { status: 201 });

  } catch (error) {
    console.error('Comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/posts/comment - Get comments for a post
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const post_id = searchParams.get('post_id');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const cursor = searchParams.get('cursor');

    if (!post_id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    let query = supabaseAdmin
      .from('comments')
      .select(`
        *,
        users:user_id (username, avatar_icon)
      `)
      .eq('post_id', post_id)
      .eq('is_flagged', false)
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data: comments, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      comments: comments || [],
      next_cursor: comments && comments.length === limit ? comments[comments.length - 1].created_at : null
    });

  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/comment - Delete a comment
export async function DELETE(request: Request) {
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
    const comment_id = searchParams.get('comment_id');

    if (!comment_id) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    // Check if comment belongs to user
    const { data: comment, error: findError } = await supabase
      .from('comments')
      .select('id, user_id')
      .eq('id', comment_id)
      .single();

    if (findError || !comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    if (comment.user_id !== user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own comments' },
        { status: 403 }
      );
    }

    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', comment_id);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Comment deleted'
    });

  } catch (error) {
    console.error('Delete comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
