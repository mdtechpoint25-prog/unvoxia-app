import { NextResponse } from 'next/server';
import { query, execute, generateId } from '@/lib/turso';
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

    let sql = `
      SELECT p.*, u.username, u.avatar_url
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
    `;
    const args: any[] = [];

    if (category && category !== 'all') {
      sql += ' WHERE p.category = ?';
      args.push(category);
    }

    sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    args.push(limit, offset);

    const posts = await query(sql, args);

    // Process posts to include user info and handle anonymous
    const processedPosts = posts.map((post: any) => ({
      ...post,
      users: post.is_anonymous
        ? { username: 'Anonymous', avatar_url: null }
        : { username: post.username, avatar_url: post.avatar_url }
    }));

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

    const postId = generateId();

    await execute(
      `INSERT INTO posts (id, user_id, content, category, media_url, is_anonymous)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [postId, user.userId, content.trim(), category || 'Thoughts', media_url || null, is_anonymous ? 1 : 0]
    );

    return NextResponse.json({ 
      ok: true, 
      post: { 
        id: postId, 
        content: content.trim(), 
        category: category || 'Thoughts',
        is_anonymous 
      } 
    });
  } catch (error) {
    console.error('Posts POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}