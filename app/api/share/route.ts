import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/turso';

export async function POST(req: NextRequest) {
  try {
    const { content, mood, anonymous } = await req.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: 'Content too long (max 1000 characters)' },
        { status: 400 }
      );
    }

    const db = getDb();

    // For anonymous submissions, we create a post with no user_id
    // or use a special "anonymous" user ID
    const result = await db.execute({
      sql: `INSERT INTO posts (content, category, user_id, created_at, updated_at) 
            VALUES (?, ?, NULL, datetime('now'), datetime('now'))`,
      args: [content.trim(), mood || 'general']
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been shared anonymously',
      mood: mood || 'general'
    });

  } catch (error) {
    console.error('❌ Anonymous share error:', error);
    return NextResponse.json(
      { error: 'Failed to share message' },
      { status: 500 }
    );
  }
}
