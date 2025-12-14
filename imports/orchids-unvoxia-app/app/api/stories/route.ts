import { NextResponse } from 'next/server';
import { getDb, isDatabaseConfigured } from '@/lib/turso';

// Anonymous names pool for generating display names
const ANONYMOUS_NAMES = [
  'Healing Soul', 'Rising Phoenix', 'Silent Strength', 'Brave Heart',
  'Gentle Spirit', 'Quiet Warrior', 'Hopeful Heart', 'Seeking Light',
  'Finding Peace', 'Growing Stronger', 'Inner Light', 'Peaceful Mind',
  'Courageous One', 'Tender Heart', 'Wise Soul', 'Patient Spirit',
  'Resilient Heart', 'Kind Soul', 'Humble Heart', 'Grateful Spirit',
  'Compassionate Soul', 'Understanding Heart', 'Loving Spirit', 'Caring Soul'
];

const CATEGORIES = {
  'love-relationships': { name: 'Love & Relationships', emoji: '💔' },
  'mental-health': { name: 'Mental Health', emoji: '🧠' },
  'marriage-family': { name: 'Marriage & Family', emoji: '💍' },
  'job-stress': { name: 'Jobs & Career', emoji: '💼' },
  'home-trauma': { name: 'Family Trauma', emoji: '🏠' },
  'loneliness': { name: 'Loneliness', emoji: '😔' },
  'secrets': { name: 'Confessions', emoji: '🔒' },
  'healing-growth': { name: 'Healing & Growth', emoji: '🌱' },
  'health': { name: 'Health Struggles', emoji: '🩺' },
  'other': { name: 'Other', emoji: '💭' }
};

function getRandomAnonymousName(): string {
  return ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)];
}

function generateExcerpt(content: string, maxLength = 160): string {
  const cleanContent = content.replace(/<[^>]*>/g, '').replace(/\n+/g, ' ').trim();
  if (cleanContent.length <= maxLength) return cleanContent;
  return cleanContent.substring(0, maxLength).trim() + '...';
}

// Generate URL-friendly slug from title
function generateSlug(title: string, id?: number | bigint): string {
  let slug = title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
  
  // Append ID to ensure uniqueness for user-submitted stories
  if (id) {
    slug = `${slug}-${id}`;
  }
  
  return slug;
}

function getSessionId(request: Request): string {
  // Try to get session from cookie or generate one
  const cookies = request.headers.get('cookie') || '';
  const sessionMatch = cookies.match(/story_session=([^;]+)/);
  if (sessionMatch) return sessionMatch[1];
  
  // Generate a simple session ID from IP + user agent
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 32);
}

// GET /api/stories - List stories
export async function GET(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const db = await getDb();
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'latest'; // 'latest', 'popular', 'trending'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let orderBy = 'created_at DESC';
    if (sort === 'popular') orderBy = 'views DESC, created_at DESC';
    if (sort === 'trending') orderBy = 'is_trending DESC, views DESC, created_at DESC';

    let whereClause = "status = 'published'";
    const params: (string | number)[] = [];

    if (category && category !== 'all') {
      whereClause += ' AND category_id = ?';
      params.push(category);
    }

    // Get total count
    const countResult = await db.execute({
      sql: `SELECT COUNT(*) as total FROM stories WHERE ${whereClause}`,
      args: params
    });
    const total = Number(countResult.rows[0]?.total || 0);

    // Get stories with reaction and comment counts
    const result = await db.execute({
      sql: `
        SELECT 
          s.id, s.title, s.excerpt, s.category_id, s.category_name, s.emoji,
          s.anonymous_name, s.views, s.is_featured, s.is_trending, s.created_at,
          COALESCE((SELECT COUNT(*) FROM story_reactions WHERE story_id = s.id), 0) as reaction_count,
          COALESCE((SELECT COUNT(*) FROM story_comments WHERE story_id = s.id AND status = 'published'), 0) as comment_count
        FROM stories s
        WHERE ${whereClause}
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `,
      args: [...params, limit, offset]
    });

    const stories = result.rows.map(row => ({
      id: row.id,
      title: row.title,
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
      comments: row.comment_count
    }));

    const response = NextResponse.json({
      stories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

    // Set session cookie if not exists
    const cookies = request.headers.get('cookie') || '';
    if (!cookies.includes('story_session=')) {
      const sessionId = getSessionId(request);
      response.headers.set('Set-Cookie', `story_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);
    }

    return response;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

// POST /api/stories - Create new story
export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const db = await getDb();
    const body = await request.json();
    
    const { title, content, categoryId, anonymousName, tags } = body;

    // Validation
    if (!title || title.trim().length < 10) {
      return NextResponse.json({ error: 'Title must be at least 10 characters' }, { status: 400 });
    }

    if (!content || content.trim().length < 100) {
      return NextResponse.json({ error: 'Story must be at least 100 characters' }, { status: 400 });
    }

    if (content.trim().length > 50000) {
      return NextResponse.json({ error: 'Story is too long (max 50,000 characters)' }, { status: 400 });
    }

    const category = CATEGORIES[categoryId as keyof typeof CATEGORIES];
    if (!category) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const sessionId = getSessionId(request);
    const displayName = anonymousName?.trim() || getRandomAnonymousName();
    const excerpt = generateExcerpt(content);

    // Insert story
    const result = await db.execute({
      sql: `
        INSERT INTO stories (title, content, excerpt, category_id, category_name, emoji, anonymous_name, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'published')
      `,
      args: [title.trim(), content.trim(), excerpt, categoryId, category.name, category.emoji, displayName]
    });

    const storyId = result.lastInsertRowid;
    
    if (!storyId) {
      return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
    }
    
    // Generate slug with ID for uniqueness
    const slug = generateSlug(title.trim(), storyId);
    
    // Update story with slug
    await db.execute({
      sql: 'UPDATE stories SET slug = ? WHERE id = ?',
      args: [slug, Number(storyId)]
    });

    // Insert tags if provided
    if (tags && Array.isArray(tags)) {
      for (const tag of tags.slice(0, 5)) { // Max 5 tags
        if (tag.trim()) {
          await db.execute({
            sql: 'INSERT INTO story_tags (story_id, tag) VALUES (?, ?)',
            args: [storyId, tag.trim().toLowerCase()]
          });
        }
      }
    }

    const response = NextResponse.json({
      success: true,
      message: 'Your story has been shared!',
      storyId: storyId?.toString(),
      slug: slug
    }, { status: 201 });

    // Set session cookie
    response.headers.set('Set-Cookie', `story_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`);

    return response;
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ error: 'Failed to share story' }, { status: 500 });
  }
}
