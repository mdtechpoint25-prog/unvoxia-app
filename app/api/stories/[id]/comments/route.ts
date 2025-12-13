import { NextResponse } from 'next/server';
import { getDb, isDatabaseConfigured } from '@/lib/turso';

// Anonymous names for commenters
const COMMENT_NAMES = [
  'Compassionate Soul', 'Supporting Heart', 'Caring Friend', 'Gentle Voice',
  'Kind Spirit', 'Warm Heart', 'Healing Presence', 'Understanding Soul',
  'Empathetic Heart', 'Thoughtful Friend', 'Loving Spirit', 'Peaceful Mind'
];

function getSessionId(request: Request): string {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/story_session=([^;]+)/);
  if (sessionMatch) return sessionMatch[1];
  
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 32);
}

// GET /api/stories/[id]/comments - Get comments for a story
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isDatabaseConfigured()) {
      // Return empty comments for static stories
      return NextResponse.json({ comments: [], total: 0 });
    }

    const db = getDb();
    const url = new URL(request.url);
    
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await db.execute({
      sql: "SELECT COUNT(*) as total FROM story_comments WHERE story_id = ? AND status = 'published'",
      args: [id]
    });
    const total = Number(countResult.rows[0]?.total || 0);

    // Get comments with reaction counts
    const result = await db.execute({
      sql: `
        SELECT 
          c.id, c.content, c.anonymous_name, c.parent_id, c.created_at,
          COALESCE((SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.id), 0) as reaction_count
        FROM story_comments c
        WHERE c.story_id = ? AND c.status = 'published' AND c.parent_id IS NULL
        ORDER BY c.created_at DESC
        LIMIT ? OFFSET ?
      `,
      args: [id, limit, offset]
    });

    const comments = await Promise.all(result.rows.map(async (row) => {
      // Get replies for each comment
      const repliesResult = await db.execute({
        sql: `
          SELECT 
            c.id, c.content, c.anonymous_name, c.created_at,
            COALESCE((SELECT COUNT(*) FROM comment_reactions WHERE comment_id = c.id), 0) as reaction_count
          FROM story_comments c
          WHERE c.parent_id = ? AND c.status = 'published'
          ORDER BY c.created_at ASC
          LIMIT 5
        `,
        args: [row.id]
      });

      return {
        id: row.id,
        content: row.content,
        anonymousName: row.anonymous_name,
        createdAt: row.created_at,
        reactions: row.reaction_count,
        replies: repliesResult.rows.map(r => ({
          id: r.id,
          content: r.content,
          anonymousName: r.anonymous_name,
          createdAt: r.created_at,
          reactions: r.reaction_count
        }))
      };
    }));

    return NextResponse.json({
      comments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST /api/stories/[id]/comments - Add comment
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const db = getDb();
    const body = await request.json();
    
    const { content, anonymousName, parentId } = body;

    // Validation
    if (!content || content.trim().length < 5) {
      return NextResponse.json({ error: 'Comment must be at least 5 characters' }, { status: 400 });
    }

    if (content.trim().length > 2000) {
      return NextResponse.json({ error: 'Comment is too long (max 2,000 characters)' }, { status: 400 });
    }

    const sessionId = getSessionId(request);
    const displayName = anonymousName?.trim() || COMMENT_NAMES[Math.floor(Math.random() * COMMENT_NAMES.length)];

    // Rate limiting: Check if user has posted recently
    const recentResult = await db.execute({
      sql: `
        SELECT COUNT(*) as count FROM story_comments 
        WHERE session_id = ? AND created_at > datetime('now', '-1 minute')
      `,
      args: [sessionId]
    });
    
    if (Number(recentResult.rows[0]?.count || 0) >= 3) {
      return NextResponse.json({ 
        error: 'Please wait a moment before posting again' 
      }, { status: 429 });
    }

    // Insert comment
    const result = await db.execute({
      sql: `
        INSERT INTO story_comments (story_id, parent_id, content, anonymous_name, session_id, status)
        VALUES (?, ?, ?, ?, ?, 'published')
      `,
      args: [id, parentId || null, content.trim(), displayName, sessionId]
    });

    const commentId = result.lastInsertRowid;

    const response = NextResponse.json({
      success: true,
      message: 'Comment posted!',
      comment: {
        id: commentId?.toString(),
        content: content.trim(),
        anonymousName: displayName,
        createdAt: new Date().toISOString(),
        reactions: 0,
        replies: []
      }
    }, { status: 201 });

    // Set session cookie
    response.headers.set('Set-Cookie', `story_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);

    return response;
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
