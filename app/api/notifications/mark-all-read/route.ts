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

// Mark all notifications as read
export async function POST() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.userId)
      .eq('read', false);

    if (error) {
      console.error('Mark all read error:', error);
      return NextResponse.json({ error: 'Failed to mark notifications as read' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Mark all read error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
