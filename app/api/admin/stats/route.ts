import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

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

// Get admin stats
export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add admin role check here
    // For now, return stats for any logged-in user

    // Get total users
    const { count: usersCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get total posts
    const { count: postsCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true });

    // Get total comments
    const { count: commentsCount } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true });

    // Get total messages
    const { count: messagesCount } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true });

    // Get recent posts for moderation
    const { data: recentPosts } = await supabase
      .from('posts')
      .select(`
        id,
        content,
        category,
        created_at,
        is_anonymous,
        users:user_id (username)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get posts by category
    const { data: categoryData } = await supabase
      .from('posts')
      .select('category');

    const categoryStats: Record<string, number> = {};
    (categoryData || []).forEach((p: any) => {
      const cat = p.category || 'Other';
      categoryStats[cat] = (categoryStats[cat] || 0) + 1;
    });

    // Get flagged posts
    const { data: flaggedPosts } = await supabase
      .from('flagged_posts')
      .select(`
        id,
        post_id,
        reason,
        status,
        created_at,
        posts:post_id (content, users:user_id (username)),
        reporter:reporter_id (username)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    // Get users list
    const { data: users } = await supabase
      .from('users')
      .select('id, username, email, status, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    return NextResponse.json({
      stats: {
        users: usersCount || 0,
        posts: postsCount || 0,
        comments: commentsCount || 0,
        messages: messagesCount || 0
      },
      categoryStats,
      recentPosts: recentPosts || [],
      flaggedPosts: flaggedPosts || [],
      users: users || []
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
