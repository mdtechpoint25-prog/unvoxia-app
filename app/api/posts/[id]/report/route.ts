import { NextResponse } from 'next/server';
import { queryOne, execute, generateId } from '@/lib/turso';
import { cookies } from 'next/headers';
import { REPORT_REASONS } from '@/lib/constants';

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

// Report a post
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { reason } = await request.json();

    if (!reason?.trim()) {
      return NextResponse.json({ error: 'Report reason is required' }, { status: 400 });
    }

    // Validate reason is in allowed list
    if (!REPORT_REASONS.includes(reason)) {
      return NextResponse.json({ error: 'Invalid report reason' }, { status: 400 });
    }

    // Check if post exists
    const post = await queryOne(
      'SELECT id FROM posts WHERE id = ?',
      [postId]
    );

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if user already reported this post
    const existingReport = await queryOne(
      'SELECT id FROM flagged_posts WHERE post_id = ? AND reporter_id = ?',
      [postId, user.userId]
    );

    if (existingReport) {
      return NextResponse.json({ error: 'You have already reported this post' }, { status: 400 });
    }

    // Create the report
    const reportId = generateId();
    await execute(
      `INSERT INTO flagged_posts (id, post_id, reporter_id, reason, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [reportId, postId, user.userId, reason.trim()]
    );

    return NextResponse.json({
      ok: true,
      message: 'Report submitted successfully. Our team will review it shortly.'
    });
  } catch (error) {
    console.error('Report POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
