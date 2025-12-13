import { NextResponse } from 'next/server';
import { db } from '@/lib/turso';

export async function GET(
  req: Request,
  { params }: { params: { circleId: string } }
) {
  try {
    const { circleId } = params;

    // Fetch posts for this circle
    const result = await db.execute({
      sql: `SELECT id, content, anonymous_label, created_at, post_type 
            FROM circle_posts 
            WHERE circle_id = ? 
            ORDER BY created_at DESC 
            LIMIT 50`,
      args: [circleId]
    });

    return NextResponse.json({
      posts: result.rows.map((row: any) => ({
        id: row.id,
        content: row.content,
        anonymous_label: row.anonymous_label,
        created_at: row.created_at,
        post_type: row.post_type,
        support_reactions: [],
        comments_count: 0
      }))
    });

  } catch (error) {
    console.error('❌ Circle posts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to load posts', posts: [] },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { circleId: string } }
) {
  try {
    const { circleId } = params;
    const { content, post_type, anonymous_label } = await req.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (content.length > 1500) {
      return NextResponse.json(
        { error: 'Content too long (max 1500 characters)' },
        { status: 400 }
      );
    }

    // Insert anonymous post into circle
    const result = await db.execute({
      sql: `INSERT INTO circle_posts (circle_id, content, post_type, anonymous_label, created_at, updated_at) 
            VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [circleId, content.trim(), post_type || 'experience', anonymous_label || 'Anonymous Voice']
    });

    return NextResponse.json({
      success: true,
      message: 'Posted to circle successfully'
    });

  } catch (error) {
    console.error('❌ Circle post creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
