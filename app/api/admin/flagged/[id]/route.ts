import { NextResponse } from 'next/server';
import { execute } from '@/lib/turso';
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

// Handle flagged post action
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();

    if (!['dismiss', 'action'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update the flag status
    const newStatus = action === 'dismiss' ? 'dismissed' : 'actioned';
    await execute(
      `UPDATE flagged_posts SET status = ?, resolved_at = ?, reviewed_by = ? WHERE id = ?`,
      [newStatus, new Date().toISOString(), user.userId, id]
    );

    // If action taken, delete the post
    if (action === 'action') {
      await execute(
        `DELETE FROM posts WHERE id = (SELECT post_id FROM flagged_posts WHERE id = ?)`,
        [id]
      );
    }

    return NextResponse.json({
      ok: true,
      status: newStatus,
      message: action === 'dismiss' ? 'Flag dismissed' : 'Post removed'
    });
  } catch (error) {
    console.error('Flagged post PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
