import { NextResponse } from 'next/server';
import { execute } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';

// Handle flagged post action
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { action } = await request.json();

    if (!['dismiss', 'action'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update the flag status
    const newStatus = action === 'dismiss' ? 'dismissed' : 'actioned';
    await execute(
      `UPDATE flagged_posts SET status = ?, resolved_at = ?, admin_notes = ? WHERE id = ?`,
      [newStatus, new Date().toISOString(), `Reviewed by ${admin.username}`, id]
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
