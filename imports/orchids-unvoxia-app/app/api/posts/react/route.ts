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

// POST /api/posts/react - React to a post ("I Feel This")
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
    const { post_id, reaction_type } = await request.json();

    if (!post_id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Validate reaction type
    const validTypes = ['feel_this', 'not_alone', 'strength'];
    const type = validTypes.includes(reaction_type) ? reaction_type : 'feel_this';

    // Check if post exists
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id, user_id')
      .eq('id', post_id)
      .eq('is_flagged', false)
      .single();

    if (postError || !post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Check if already reacted
    const { data: existingReaction } = await supabase
      .from('reactions')
      .select('*')
      .eq('user_id', user.id)
      .eq('post_id', post_id)
      .single();

    if (existingReaction) {
      // Toggle off (remove reaction)
      const { error: deleteError } = await supabase
        .from('reactions')
        .delete()
        .eq('user_id', user.id)
        .eq('post_id', post_id);

      if (deleteError) {
        return NextResponse.json(
          { error: 'Failed to remove reaction' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        reacted: false,
        message: 'Reaction removed'
      });
    }

    // Add reaction
    const { error: insertError } = await supabase
      .from('reactions')
      .insert({
        user_id: user.id,
        post_id,
        reaction_type: type
      });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to add reaction' },
        { status: 500 }
      );
    }

    // Create notification for post author (if not self)
    if (post.user_id !== user.id) {
      // Get reactor's username
      const { data: reactor } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single();

      await supabaseAdmin
        .from('notifications')
        .insert({
          user_id: post.user_id,
          type: 'reaction',
          reference_id: post_id,
          actor_id: user.id,
          message: `${reactor?.username || 'Someone'} felt this on your post`,
          is_read: false
        });
    }

    return NextResponse.json({
      success: true,
      reacted: true,
      reaction_type: type,
      message: 'Reaction added'
    });

  } catch (error) {
    console.error('React error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
