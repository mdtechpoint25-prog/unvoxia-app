import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(_req: Request, { params }: { params: { username: string } }) {
  try {
    // Get user profile with ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, avatar_url, badges, created_at')
      .eq('username', params.username)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Get user's posts
    const { data: posts } = await supabase
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_url)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    // Get post count
    const { count: postsCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get comments count
    const { count: commentsCount } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get reactions received count
    const { count: reactionsCount } = await supabase
      .from('reactions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    return NextResponse.json({
      username: user.username,
      avatar_url: user.avatar_url,
      badges: user.badges,
      created_at: user.created_at,
      stats: {
        posts: postsCount || 0,
        comments: commentsCount || 0,
        reactions: reactionsCount || 0
      },
      posts: posts || []
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH() {
  // Placeholder: update user
  return NextResponse.json({ ok: true });
}