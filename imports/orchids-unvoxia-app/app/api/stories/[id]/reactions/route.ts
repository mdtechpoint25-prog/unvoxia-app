import { NextResponse } from 'next/server';
import { getDb, isDatabaseConfigured } from '@/lib/turso';

const REACTION_TYPES = ['heart', 'hug', 'support', 'relate', 'pray'] as const;

function getSessionId(request: Request): string {
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/story_session=([^;]+)/);
  if (sessionMatch) return sessionMatch[1];
  
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 32);
}

// GET /api/stories/[id]/reactions - Get reactions for a story
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!isDatabaseConfigured()) {
      // Return default reactions for static stories
      return NextResponse.json({
        total: Math.floor(Math.random() * 200) + 50,
        byType: {
          heart: Math.floor(Math.random() * 100) + 20,
          hug: Math.floor(Math.random() * 50) + 10,
          support: Math.floor(Math.random() * 50) + 10,
          relate: Math.floor(Math.random() * 30) + 5,
          pray: Math.floor(Math.random() * 20) + 5
        },
        userReaction: null
      });
    }

    const db = getDb();
    const sessionId = getSessionId(request);

    // Get reaction counts by type
    const result = await db.execute({
      sql: `
        SELECT reaction_type, COUNT(*) as count 
        FROM story_reactions 
        WHERE story_id = ?
        GROUP BY reaction_type
      `,
      args: [id]
    });

    const byType: Record<string, number> = {};
    let total = 0;
    
    for (const row of result.rows) {
      const count = Number(row.count);
      byType[row.reaction_type as string] = count;
      total += count;
    }

    // Check if user has reacted
    const userResult = await db.execute({
      sql: 'SELECT reaction_type FROM story_reactions WHERE story_id = ? AND session_id = ?',
      args: [id, sessionId]
    });

    const userReaction = userResult.rows.length > 0 ? userResult.rows[0].reaction_type : null;

    return NextResponse.json({
      total,
      byType,
      userReaction
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return NextResponse.json({ error: 'Failed to fetch reactions' }, { status: 500 });
  }
}

// POST /api/stories/[id]/reactions - Add/toggle reaction
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
    
    const { reactionType } = body;

    // Validate reaction type
    if (!REACTION_TYPES.includes(reactionType)) {
      return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
    }

    const sessionId = getSessionId(request);

    // Check if user already reacted with this type
    const existingResult = await db.execute({
      sql: 'SELECT id FROM story_reactions WHERE story_id = ? AND session_id = ? AND reaction_type = ?',
      args: [id, sessionId, reactionType]
    });

    let action: 'added' | 'removed';

    if (existingResult.rows.length > 0) {
      // Remove reaction (toggle off)
      await db.execute({
        sql: 'DELETE FROM story_reactions WHERE story_id = ? AND session_id = ? AND reaction_type = ?',
        args: [id, sessionId, reactionType]
      });
      action = 'removed';
    } else {
      // Remove any existing reaction from this user on this story
      await db.execute({
        sql: 'DELETE FROM story_reactions WHERE story_id = ? AND session_id = ?',
        args: [id, sessionId]
      });
      
      // Add new reaction
      await db.execute({
        sql: 'INSERT INTO story_reactions (story_id, reaction_type, session_id) VALUES (?, ?, ?)',
        args: [id, reactionType, sessionId]
      });
      action = 'added';
    }

    // Get updated counts
    const countResult = await db.execute({
      sql: `
        SELECT reaction_type, COUNT(*) as count 
        FROM story_reactions 
        WHERE story_id = ?
        GROUP BY reaction_type
      `,
      args: [id]
    });

    const byType: Record<string, number> = {};
    let total = 0;
    
    for (const row of countResult.rows) {
      const count = Number(row.count);
      byType[row.reaction_type as string] = count;
      total += count;
    }

    const response = NextResponse.json({
      success: true,
      action,
      total,
      byType,
      userReaction: action === 'added' ? reactionType : null
    });

    // Set session cookie
    response.headers.set('Set-Cookie', `story_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);

    return response;
  } catch (error) {
    console.error('Error handling reaction:', error);
    return NextResponse.json({ error: 'Failed to update reaction' }, { status: 500 });
  }
}
