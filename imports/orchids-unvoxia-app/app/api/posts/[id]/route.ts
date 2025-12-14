import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

async function getUserFromSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    if (decoded.exp < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get comments for this post
    const { data: comments } = await supabase
      .from('comments')
      .select(`
        *,
        users:user_id (username, avatar_url)
      `)
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    // Get reactions for this post
    const { data: reactions } = await supabase
      .from('reactions')
      .select('emoji, user_id')
      .eq('target_type', 'post')
      .eq('target_id', id);

    return NextResponse.json({
      post,
      comments: comments || [],
      reactions: reactions || []
    });
  } catch (error) {
    console.error('Get post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user owns the post
    const { data: post } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!post || post.user_id !== user.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
