import { NextResponse } from 'next/server';
import { query, queryOne, execute } from '@/lib/turso';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

async function getUserFromSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    if (decoded.exp < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;
    
    // Get user profile
    const user = await queryOne<{
      id: string;
      username: string;
      avatar_url: string | null;
      bio: string | null;
      streak_count: number;
      created_at: string;
    }>(
      'SELECT id, username, avatar_url, bio, streak_count, created_at FROM users WHERE username = ?',
      [username]
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Get user's posts
    const sessionUser = await getUserFromSession();
    const isOwnProfile = sessionUser?.username === username;
    
    let postsQuery = `
      SELECT p.*, u.username, u.avatar_url as user_avatar
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ?
    `;
    
    if (!isOwnProfile) {
      postsQuery += ' AND p.is_anonymous = 0';
    }
    
    postsQuery += ' ORDER BY p.created_at DESC LIMIT 20';
    
    const posts = await query(postsQuery, [userId]);

    // Format posts
    const formattedPosts = posts.map((p: any) => ({
      ...p,
      users: { username: p.username, avatar_url: p.user_avatar }
    }));

    // Get counts
    const postsCountResult = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM posts WHERE user_id = ?',
      [userId]
    );
    
    const commentsCountResult = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM comments WHERE user_id = ?',
      [userId]
    );
    
    const reactionsCountResult = await queryOne<{ count: number }>(
      'SELECT COUNT(*) as count FROM reactions WHERE user_id = ?',
      [userId]
    );

    return NextResponse.json({
      username: user.username,
      avatar_url: user.avatar_url,
      bio: user.bio,
      badges: [],
      streak_count: user.streak_count || 0,
      created_at: user.created_at,
      stats: {
        posts: postsCountResult?.count || 0,
        comments: commentsCountResult?.count || 0,
        reactions: reactionsCountResult?.count || 0
      },
      posts: formattedPosts
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params;
    const sessionUser = await getUserFromSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify user is updating their own profile
    if (sessionUser.username !== username) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { avatar_url, bio, password, notification_settings } = body;

    const updates: string[] = [];
    const values: any[] = [];

    // Update avatar
    if (avatar_url !== undefined) {
      updates.push('avatar_url = ?');
      values.push(avatar_url);
    }

    // Update bio
    if (bio !== undefined) {
      updates.push('bio = ?');
      values.push(bio.slice(0, 200));
    }

    // Update password
    if (password) {
      if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
      }
      updates.push('password_hash = ?');
      values.push(await bcrypt.hash(password, 12));
    }

    // Update notification settings
    if (notification_settings) {
      updates.push('notification_settings = ?');
      values.push(JSON.stringify(notification_settings));
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(sessionUser.userId);

    await execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return NextResponse.json({ ok: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('PATCH user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}