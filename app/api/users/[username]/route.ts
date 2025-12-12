import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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
    // Get user profile with ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, avatar_url, badges, created_at')
      .eq('username', username)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = user.id;

    // Get user's posts
    const { data: posts } = await supabase
      .from('posts')
      .select(`
        *,
        users:user_id (username, avatar_url)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    // Get post count
    const { count: postsCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get comments count
    const { count: commentsCount } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get reactions received count
    const { count: reactionsCount } = await supabase
      .from('reactions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    return NextResponse.json({
      username: user.username,
      avatar_url: user.avatar_url,
      badges: user.badges,
      created_at: user.created_at,
      stats: {
        posts: postsCount || 0,
        comments: commentsCount || 0,
        reactions: reactionsCount || 0
      },
      posts: posts || []
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
    const { avatar_url, password, notification_settings } = body;

    const updates: Record<string, any> = {};

    // Update avatar
    if (avatar_url !== undefined) {
      updates.avatar_url = avatar_url;
    }

    // Update password
    if (password) {
      if (password.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
      }
      updates.password_hash = await bcrypt.hash(password, 12);
    }

    // Update notification settings (stored as JSON)
    if (notification_settings) {
      updates.notification_settings = notification_settings;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', sessionUser.userId);

    if (error) {
      console.error('Update user error:', error);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('PATCH user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}