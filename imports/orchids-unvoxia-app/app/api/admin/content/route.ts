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
    const type = searchParams.get('type') || 'posts'; // posts, comments, messages
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    let data: any[] = [];
    let total = 0;

    if (type === 'posts') {
      const countResult = await query(
        search 
          ? `SELECT COUNT(*) as total FROM posts p 
             JOIN users u ON p.user_id = u.id 
             WHERE p.content LIKE ? OR u.username LIKE ?`
          : 'SELECT COUNT(*) as total FROM posts',
        search ? [`%${search}%`, `%${search}%`] : []
      );
      total = countResult[0]?.total || 0;

      data = await query(
        `SELECT p.*, u.username, u.avatar_url,
         (SELECT COUNT(*) FROM reactions WHERE post_id = p.id) as reaction_count,
         (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count,
         (SELECT COUNT(*) FROM flagged_posts WHERE post_id = p.id) as flag_count
         FROM posts p
         JOIN users u ON p.user_id = u.id
         ${search ? 'WHERE p.content LIKE ? OR u.username LIKE ?' : ''}
         ORDER BY p.created_at DESC
         LIMIT ? OFFSET ?`,
        search ? [`%${search}%`, `%${search}%`, limit, offset] : [limit, offset]
      );
    } else if (type === 'comments') {
      const countResult = await query(
        search 
          ? `SELECT COUNT(*) as total FROM comments c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.content LIKE ? OR u.username LIKE ?`
          : 'SELECT COUNT(*) as total FROM comments',
        search ? [`%${search}%`, `%${search}%`] : []
      );
      total = countResult[0]?.total || 0;

      data = await query(
        `SELECT c.*, u.username, u.avatar_url, p.content as post_content
         FROM comments c
         JOIN users u ON c.user_id = u.id
         LEFT JOIN posts p ON c.post_id = p.id
         ${search ? 'WHERE c.content LIKE ? OR u.username LIKE ?' : ''}
         ORDER BY c.created_at DESC
         LIMIT ? OFFSET ?`,
        search ? [`%${search}%`, `%${search}%`, limit, offset] : [limit, offset]
      );
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Admin content error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { type, id } = await request.json();

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (type === 'post') {
      // Delete related data first
      await query('DELETE FROM reactions WHERE post_id = ?', [id]);
      await query('DELETE FROM comments WHERE post_id = ?', [id]);
      await query('DELETE FROM flagged_posts WHERE post_id = ?', [id]);
      await query('DELETE FROM posts WHERE id = ?', [id]);
    } else if (type === 'comment') {
      await query('DELETE FROM comments WHERE id = ?', [id]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin content delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
