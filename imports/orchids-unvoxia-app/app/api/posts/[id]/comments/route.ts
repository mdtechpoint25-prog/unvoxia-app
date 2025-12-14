import { NextResponse } from 'next/server';
import { query, queryOne, execute, generateId } from '@/lib/turso';
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

// Helper to build threaded comment tree
function buildCommentTree(comments: any[]) {
  const commentMap = new Map();
  const rootComments: any[] = [];

  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  comments.forEach(comment => {
    const node = commentMap.get(comment.id);
    if (comment.parent_id && commentMap.has(comment.parent_id)) {
      commentMap.get(comment.parent_id).replies.push(node);
    } else {
      rootComments.push(node);
    }
  });

  return rootComments;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const threaded = searchParams.get('threaded') === 'true';

    const comments = await query(
      `SELECT c.*, u.username, u.avatar_url
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.created_at ASC`,
      [id]
    );

    // Format comments with user info
    const formattedComments = comments.map((c: any) => ({
      ...c,
      users: { username: c.username, avatar_url: c.avatar_url }
    }));

    if (threaded) {
      const threadedComments = buildCommentTree(formattedComments);
      return NextResponse.json({ comments: threadedComments });
    }

    return NextResponse.json({ comments: formattedComments });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, parent_id } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // If parent_id provided, verify it exists and belongs to this post
    if (parent_id) {
      const parentComment = await queryOne(
        'SELECT id, post_id FROM comments WHERE id = ?',
        [parent_id]
      );

      if (!parentComment || (parentComment as any).post_id !== id) {
        return NextResponse.json({ error: 'Invalid parent comment' }, { status: 400 });
      }
    }

    const commentId = generateId();

    await execute(
      `INSERT INTO comments (id, post_id, user_id, parent_id, content)
       VALUES (?, ?, ?, ?, ?)`,
      [commentId, id, user.userId, parent_id || null, content.trim()]
    );

    // Update comments count on post
    await execute(
      'UPDATE posts SET comments_count = comments_count + 1 WHERE id = ?',
      [id]
    );

    // Get user info for response
    const userData = await queryOne(
      'SELECT username, avatar_url FROM users WHERE id = ?',
      [user.userId]
    );

    return NextResponse.json({ 
      ok: true, 
      comment: {
        id: commentId,
        post_id: id,
        user_id: user.userId,
        parent_id: parent_id || null,
        content: content.trim(),
        created_at: new Date().toISOString(),
        users: userData || { username: user.username, avatar_url: null }
      }
    });
  } catch (error) {
    console.error('Comments POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

