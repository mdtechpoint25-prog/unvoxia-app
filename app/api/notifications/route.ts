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

interface ReactionRow {
  id: string;
  emoji: string;
  created_at: string;
  target_id: string;
  users: { username: string } | null;
}

interface CommentRow {
  id: string;
  content: string;
  created_at: string;
  post_id: string;
  users: { username: string } | null;
}

interface MessageRow {
  id: string;
  created_at: string;
  sender: { username: string } | null;
}

export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notifications: { id: string; type: string; message: string; created_at: string; read: boolean; link: string }[] = [];

    // Get reactions on user's posts
    const { data: userPosts } = await supabase
      .from('posts')
      .select('id')
      .eq('user_id', user.userId);

    const postIds = (userPosts || []).map(p => p.id);

    if (postIds.length > 0) {
      // Get recent reactions on user's posts
      const { data: reactionsData } = await supabase
        .from('reactions')
        .select(`
          id,
          emoji,
          created_at,
          target_id,
          users:user_id (username)
        `)
        .eq('target_type', 'post')
        .in('target_id', postIds)
        .neq('user_id', user.userId)
        .order('created_at', { ascending: false })
        .limit(20);

      const reactions = reactionsData as unknown as ReactionRow[];
      for (const reaction of reactions || []) {
        notifications.push({
          id: `reaction-${reaction.id}`,
          type: 'reaction',
          message: `${reaction.users?.username || 'Someone'} reacted ${reaction.emoji} to your post`,
          created_at: reaction.created_at,
          read: false,
          link: `/feed`
        });
      }

      // Get recent comments on user's posts
      const { data: commentsData } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          post_id,
          users:user_id (username)
        `)
        .in('post_id', postIds)
        .neq('user_id', user.userId)
        .order('created_at', { ascending: false })
        .limit(20);

      const comments = commentsData as unknown as CommentRow[];
      for (const comment of comments || []) {
        notifications.push({
          id: `comment-${comment.id}`,
          type: 'comment',
          message: `${comment.users?.username || 'Someone'} commented: "${comment.content.substring(0, 50)}${comment.content.length > 50 ? '...' : ''}"`,
          created_at: comment.created_at,
          read: false,
          link: `/feed`
        });
      }
    }

    // Get unread messages
    const { data: messagesData } = await supabase
      .from('messages')
      .select(`
        id,
        created_at,
        sender:sender_id (username)
      `)
      .eq('receiver_id', user.userId)
      .eq('read', false)
      .order('created_at', { ascending: false })
      .limit(10);

    const messages = messagesData as unknown as MessageRow[];
    for (const msg of messages || []) {
      notifications.push({
        id: `message-${msg.id}`,
        type: 'message',
        message: `New message from ${msg.sender?.username || 'Someone'}`,
        created_at: msg.created_at,
        read: false,
        link: `/messages`
      });
    }

    // Sort by date
    notifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      notifications: notifications.slice(0, 30),
      unreadCount: notifications.length
    });
  } catch (error) {
    console.error('Notifications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}