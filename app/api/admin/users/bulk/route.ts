import { NextResponse } from 'next/server';
import { query } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const offset = (page - 1) * limit;

    let whereClause = [];
    let params: any[] = [];

    if (search) {
      whereClause.push('(username LIKE ? OR email LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
      whereClause.push('status = ?');
      params.push(status);
    }

    const where = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';

    // Get total count
    const countResult = await query(
      `SELECT COUNT(*) as total FROM users ${where}`,
      params
    );
    const total = countResult[0]?.total || 0;

    // Get users with post/message counts
    const users = await query(
      `SELECT 
        u.*,
        COUNT(DISTINCT p.id) as post_count,
        COUNT(DISTINCT m.id) as message_count,
        (SELECT COUNT(*) FROM flagged_posts fp 
         JOIN posts p2 ON fp.post_id = p2.id 
         WHERE p2.user_id = u.id) as flagged_content_count
       FROM users u
       LEFT JOIN posts p ON u.id = p.user_id
       LEFT JOIN messages m ON u.id = m.sender_id
       ${where}
       GROUP BY u.id
       ORDER BY u.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Admin bulk users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
