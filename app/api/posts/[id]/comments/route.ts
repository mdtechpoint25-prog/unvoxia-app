import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

function getUserFromSession() {
  try {
    const cookieStore = cookies();
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
  { params }: { params: { id: string } }
) {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        *,
        users:user_id (username, avatar_url)
      `)
      .eq('post_id', params.id)
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }

    return NextResponse.json({ comments: comments || [] });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        post_id: params.id,
        user_id: user.userId,
        content: content.trim()
      })
      .select(`
        *,
        users:user_id (username, avatar_url)
      `)
      .single();

    if (error) {
      console.error('Create comment error:', error);
      return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }

    // Update comments count on post
    const { data: post } = await supabase
      .from('posts')
      .select('comments_count')
      .eq('id', params.id)
      .single();

    if (post) {
      await supabase
        .from('posts')
        .update({ comments_count: (post.comments_count || 0) + 1 } as any)
        .eq('id', params.id);
    }

    return NextResponse.json({ ok: true, comment });
  } catch (error) {
    console.error('Comments POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
