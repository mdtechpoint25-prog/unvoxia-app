import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';

export async function GET() {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get growth metrics (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const newUsers = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM users WHERE created_at >= ?',
      [thirtyDaysAgo]
    );

    const newPosts = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM posts WHERE created_at >= ?',
      [thirtyDaysAgo]
    );

    const newMessages = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM messages WHERE created_at >= ?',
      [thirtyDaysAgo]
    );

    // Get daily active users (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const activeUsers = await queryOne<{ count: number }>(
      `SELECT COUNT(DISTINCT user_id) as count FROM (
        SELECT user_id FROM posts WHERE created_at >= ?
        UNION
        SELECT sender_id as user_id FROM messages WHERE created_at >= ?
        UNION
        SELECT user_id FROM reactions WHERE created_at >= ?
      )`,
      [sevenDaysAgo, sevenDaysAgo, sevenDaysAgo]
    );

    // Engagement metrics
    const avgPostsPerUser = await queryOne<{ avg: number }>(
      'SELECT AVG(post_count) as avg FROM (SELECT user_id, COUNT(*) as post_count FROM posts GROUP BY user_id)'
    );

    const avgReactionsPerPost = await queryOne<{ avg: number }>(
      'SELECT AVG(reaction_count) as avg FROM (SELECT post_id, COUNT(*) as reaction_count FROM reactions GROUP BY post_id)'
    );

    // Content breakdown
    const categoryBreakdown = await query(
      'SELECT category, COUNT(*) as count FROM posts GROUP BY category ORDER BY count DESC'
    );

    const anonymousVsPublic = await queryOne<{ anonymous: number; public: number }>(
      `SELECT 
        SUM(CASE WHEN is_anonymous = 1 THEN 1 ELSE 0 END) as anonymous,
        SUM(CASE WHEN is_anonymous = 0 THEN 1 ELSE 0 END) as public
       FROM posts`
    );

    // Moderation stats
    const flaggedCount = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM flagged_posts WHERE status = ?',
      ['pending']
    );

    const resolvedCount = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM flagged_posts WHERE status != ?',
      ['pending']
    );

    return NextResponse.json({
      growth: {
        newUsers: newUsers?.count || 0,
        newPosts: newPosts?.count || 0,
        newMessages: newMessages?.count || 0,
        activeUsers: activeUsers?.count || 0
      },
      engagement: {
        avgPostsPerUser: Math.round((avgPostsPerUser?.avg || 0) * 10) / 10,
        avgReactionsPerPost: Math.round((avgReactionsPerPost?.avg || 0) * 10) / 10
      },
      content: {
        categoryBreakdown,
        anonymous: anonymousVsPublic?.anonymous || 0,
        public: anonymousVsPublic?.public || 0
      },
      moderation: {
        pending: flaggedCount?.count || 0,
        resolved: resolvedCount?.count || 0
      }
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
