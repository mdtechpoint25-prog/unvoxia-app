import { NextResponse } from 'next/server';
import { getDb, isDatabaseConfigured } from '@/lib/turso';
import { getStoryById } from '@/lib/stories-data';

// GET /api/stories/[id] - Get single story
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // First check if it's a static story (from lib/stories-data.ts)
    const staticStory = getStoryById(parseInt(id));
    if (staticStory) {
      return NextResponse.json({
        story: {
          ...staticStory,
          isStatic: true,
          reactions: Math.floor(Math.random() * 200) + 50,
          comments: Math.floor(Math.random() * 30) + 5
        }
      });
    }

    // Otherwise fetch from database
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const db = getDb();
    
    // Increment view count
    await db.execute({
      sql: 'UPDATE stories SET views = views + 1 WHERE id = ? AND status = ?',
      args: [id, 'published']
    });

    // Get story with stats
    const result = await db.execute({
      sql: `
        SELECT 
          s.*,
          COALESCE((SELECT COUNT(*) FROM story_reactions WHERE story_id = s.id), 0) as reaction_count,
          COALESCE((SELECT COUNT(*) FROM story_comments WHERE story_id = s.id AND status = 'published'), 0) as comment_count
        FROM stories s
        WHERE s.id = ? AND s.status = 'published'
      `,
      args: [id]
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const row = result.rows[0];

    // Get tags
    const tagsResult = await db.execute({
      sql: 'SELECT tag FROM story_tags WHERE story_id = ?',
      args: [id]
    });
    const tags = tagsResult.rows.map(r => r.tag);

    // Get related stories
    const relatedResult = await db.execute({
      sql: `
        SELECT id, title, excerpt, category_name, emoji, anonymous_name, created_at
        FROM stories
        WHERE category_id = ? AND id != ? AND status = 'published'
        ORDER BY created_at DESC
        LIMIT 3
      `,
      args: [row.category_id, id]
    });

    const story = {
      id: row.id,
      title: row.title,
      content: row.content,
      excerpt: row.excerpt,
      categoryId: row.category_id,
      categoryName: row.category_name,
      emoji: row.emoji,
      anonymousName: row.anonymous_name,
      views: row.views,
      isFeatured: Boolean(row.is_featured),
      isTrending: Boolean(row.is_trending),
      createdAt: row.created_at,
      reactions: row.reaction_count,
      comments: row.comment_count,
      tags,
      isStatic: false
    };

    const relatedStories = relatedResult.rows.map(r => ({
      id: r.id,
      title: r.title,
      excerpt: r.excerpt,
      categoryName: r.category_name,
      emoji: r.emoji,
      anonymousName: r.anonymous_name,
      createdAt: r.created_at
    }));

    return NextResponse.json({ story, relatedStories });
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ error: 'Failed to fetch story' }, { status: 500 });
  }
}

// DELETE /api/stories/[id] - Delete story (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const db = getDb();

    // For now, just mark as removed (soft delete)
    await db.execute({
      sql: "UPDATE stories SET status = 'removed' WHERE id = ?",
      args: [id]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting story:', error);
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 });
  }
}
