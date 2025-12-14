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

// Get messages with a specific user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { partnerId } = await params;

    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        id,
        sender_id,
        receiver_id,
        content,
        media_url,
        created_at,
        read
      `)
      .or(`and(sender_id.eq.${user.userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.userId})`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Fetch conversation error:', error);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }

    // Mark messages as read
    await supabase
      .from('messages')
      .update({ read: true } as any)
      .eq('sender_id', partnerId)
      .eq('receiver_id', user.userId)
      .eq('read', false);

    return NextResponse.json({
      messages: messages || [],
      currentUserId: user.userId
    });
  } catch (error) {
    console.error('Conversation GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Send a message to specific user
export async function POST(
  request: Request,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { partnerId } = await params;
    const { content, media_url } = await request.json();

    if (!content?.trim() && !media_url) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.userId,
        receiver_id: partnerId,
        content: content?.trim() || '',
        media_url: media_url || null
      })
      .select()
      .single();

    if (error) {
      console.error('Send message error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message });
  } catch (error) {
    console.error('Conversation POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
