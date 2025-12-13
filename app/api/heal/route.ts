import { NextResponse } from 'next/server';
import { getDb } from '@/lib/turso';
import { getCompassionateResponse, type EmotionType } from '@/lib/compassionate-responses';

export async function GET() {
  try {
    const db = getDb();

    // Fetch recent anonymous posts (where user_id is NULL)
    // Show most recent first, limit to 50 posts
    const result = await db.execute({
      sql: `SELECT id, content, category, created_at 
            FROM posts 
            WHERE user_id IS NULL 
            ORDER BY created_at DESC 
            LIMIT 50`,
      args: []
    });

    // Add compassionate responses to each post
    const posts = result.rows.map((row: any) => ({
      id: row.id,
      content: row.content,
      category: row.category,
      created_at: row.created_at,
      response: getCompassionateResponse(row.category as EmotionType)
    }));

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('❌ Heal page error:', error);
    return NextResponse.json(
      { error: 'Failed to load posts', posts: [] },
      { status: 500 }
    );
  }
}
