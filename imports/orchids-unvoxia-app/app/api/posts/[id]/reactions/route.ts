import { NextResponse } from 'next/server';
import { queryOne, execute, generateId } from '@/lib/turso';
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
    const existing = await queryOne<{ id: string }>(
      'SELECT id FROM reactions WHERE post_id = ? AND user_id = ? AND emoji = ?',
      [id, user.userId, emoji]
    );

    if (existing) {
      // Remove reaction (toggle off)
      await execute(
        'DELETE FROM reactions WHERE id = ?',
        [existing.id]
      );

      return NextResponse.json({ ok: true, action: 'removed' });
    }

    // Add reaction
    const reactionId = generateId();
    await execute(
      'INSERT INTO reactions (id, post_id, user_id, emoji) VALUES (?, ?, ?, ?)',
      [reactionId, id, user.userId, emoji]
    );

    return NextResponse.json({ ok: true, action: 'added' });
  } catch (error) {
    console.error('Reactions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
