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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Fetch posts error:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    // Hide user info for anonymous posts
    const processedPosts = (posts || []).map(post => {
      if (post.is_anonymous) {
        return {
          ...post,
          users: {
            username: 'Anonymous',
            avatar_url: null
          }
        };
      }
      return post;
    });

    return NextResponse.json({ posts: processedPosts });
  } catch (error) {
    console.error('Posts GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, category, media_url, is_anonymous } = await request.json();

    if ((!content || content.trim().length === 0) && !media_url) {
      return NextResponse.json({ error: 'Content or media is required' }, { status: 400 });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        user_id: user.userId,
        content: content.trim(),
        category: category || 'Thoughts',
        media_url: media_url || null,
        is_anonymous: is_anonymous || false
      })
      .select()
      .single();

    if (error) {
      console.error('Create post error:', error);
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    console.error('Posts POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}