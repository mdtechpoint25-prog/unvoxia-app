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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { emoji } = await request.json();

    if (!emoji) {
      return NextResponse.json({ error: 'Emoji is required' }, { status: 400 });
    }

    // Check if user already reacted with this emoji
    const { data: existing } = await supabase
      .from('reactions')
      .select('id')
      .eq('target_type', 'post')
      .eq('target_id', id)
      .eq('user_id', user.userId)
      .eq('emoji', emoji)
      .single();

    if (existing) {
      // Remove reaction (toggle off)
      await supabase
        .from('reactions')
        .delete()
        .eq('id', existing.id);

      return NextResponse.json({ ok: true, action: 'removed' });
    }

    // Add reaction
    const { error } = await supabase
      .from('reactions')
      .insert({
        target_type: 'post',
        target_id: id,
        user_id: user.userId,
        emoji
      });

    if (error) {
      console.error('Add reaction error:', error);
      return NextResponse.json({ error: 'Failed to add reaction' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, action: 'added' });
  } catch (error) {
    console.error('Reactions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
