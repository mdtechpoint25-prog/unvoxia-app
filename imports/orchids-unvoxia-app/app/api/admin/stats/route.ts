import { NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/turso';
import { cookies } from 'next/headers';

// Admin emails - users with these emails have admin access
const ADMIN_EMAILS = [
  'admin@nomaworld.co.ke',
  'info@nomaworld.co.ke',
  'support@nomaworld.co.ke'
];

async function getAdminFromSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    if (decoded.exp < Date.now()) return null;
    
    // Check if user is admin (by role or email)
    const user = await queryOne<{ id: string; email: string; role: string }>(
      'SELECT id, email, role FROM users WHERE id = ?',
      [decoded.userId]
    );
    
    if (!user) return null;
    
    // Check admin access
    const isAdmin = user.role === 'admin' || ADMIN_EMAILS.includes(user.email);
    if (!isAdmin) return null;
    
    return { ...decoded, email: user.email, role: user.role };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get counts
    const usersCount = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM users');
    const postsCount = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM posts');
    const commentsCount = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM comments');
    const messagesCount = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM messages');

    const stats = {
      users: usersCount?.count || 0,
      posts: postsCount?.count || 0,
      comments: commentsCount?.count || 0,
      messages: messagesCount?.count || 0
    };

    // Get category stats
    const categoryData = await query(
      `SELECT category, COUNT(*) as count FROM posts GROUP BY category`
    );
    const categoryStats: Record<string, number> = {};
    categoryData.forEach((row: any) => {
      categoryStats[row.category] = row.count;
    });

    // Get recent posts
    const recentPosts = await query(
      `SELECT p.*, u.username 
       FROM posts p 
       LEFT JOIN users u ON p.user_id = u.id 
       ORDER BY p.created_at DESC 
       LIMIT 10`
    );

    // Format posts with user info
    const formattedPosts = recentPosts.map((p: any) => ({
      ...p,
      users: { username: p.username }
    }));

    // Get flagged posts
    const flaggedPosts = await query(
      `SELECT fp.*, p.content as post_content, u.username as reporter_username, pu.username as post_username
       FROM flagged_posts fp
       LEFT JOIN posts p ON fp.post_id = p.id
       LEFT JOIN users u ON fp.reporter_id = u.id
       LEFT JOIN users pu ON p.user_id = pu.id
       ORDER BY fp.created_at DESC`
    );

    const formattedFlagged = flaggedPosts.map((f: any) => ({
      ...f,
      posts: { content: f.post_content, users: { username: f.post_username } },
      reporter: { username: f.reporter_username }
    }));

    // Get users list
    const users = await query(
      `SELECT id, username, email, role, status, created_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT 50`
    );

    return NextResponse.json({
      stats,
      categoryStats,
      recentPosts: formattedPosts,
      flaggedPosts: formattedFlagged,
      users
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
