import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/turso';
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

// Accept or decline a chat request
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

    if (!['accept', 'decline'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Verify the request belongs to this user
    const chatRequest = await queryOne<{ id: string; receiver_id: string }>(
      'SELECT id, receiver_id FROM chat_requests WHERE id = ?',
      [id]
    );

    if (!chatRequest) {
      return NextResponse.json({ error: 'Chat request not found' }, { status: 404 });
    }

    if (chatRequest.receiver_id !== user.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const newStatus = action === 'accept' ? 'accepted' : 'declined';

    await execute(
      'UPDATE chat_requests SET status = ?, updated_at = ? WHERE id = ?',
      [newStatus, new Date().toISOString(), id]
    );

    return NextResponse.json({ 
      ok: true, 
      message: action === 'accept' ? 'Chat request accepted' : 'Chat request declined'
    });
  } catch (error) {
    console.error('Chat request PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
