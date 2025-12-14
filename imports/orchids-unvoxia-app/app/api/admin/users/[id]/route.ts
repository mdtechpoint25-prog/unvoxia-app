import { NextResponse } from 'next/server';
import { execute, queryOne } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';

// Update user status (mute/ban/activate) or role
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

    const { status, role } = await request.json();

    // Update status if provided
    if (status) {
      if (!['active', 'muted', 'banned'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }

      await execute(
        'UPDATE users SET status = ?, updated_at = ? WHERE id = ?',
        [status, new Date().toISOString(), id]
      );
    }

    // Update role if provided
    if (role) {
      if (!['user', 'admin'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
      }

      await execute(
        'UPDATE users SET role = ?, updated_at = ? WHERE id = ?',
        [role, new Date().toISOString(), id]
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Delete user (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Don't allow deleting yourself
    if (admin.userId === id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Delete user's posts, comments, messages first
    await execute('DELETE FROM posts WHERE user_id = ?', [id]);
    await execute('DELETE FROM comments WHERE user_id = ?', [id]);
    await execute('DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?', [id, id]);
    await execute('DELETE FROM notifications WHERE user_id = ?', [id]);
    
    // Delete user
    await execute('DELETE FROM users WHERE id = ?', [id]);

    return NextResponse.json({ ok: true, message: 'User deleted' });
  } catch (error) {
    console.error('User delete error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
