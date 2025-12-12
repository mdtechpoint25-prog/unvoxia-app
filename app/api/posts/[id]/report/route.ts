import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', postId)
      .single();

    if (postError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if user already reported this post
    const { data: existingReport } = await supabase
      .from('flagged_posts')
      .select('id')
      .eq('post_id', postId)
      .eq('reporter_id', user.userId)
      .single();

    if (existingReport) {
      return NextResponse.json({ error: 'You have already reported this post' }, { status: 400 });
    }

    // Create the report
    const { error: insertError } = await supabase
      .from('flagged_posts')
      .insert({
        post_id: postId,
        reporter_id: user.userId,
        reason: reason.trim(),
        status: 'pending'
      });

    if (insertError) {
      console.error('Create report error:', insertError);
      return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message: 'Report submitted successfully. Our team will review it shortly.'
    });
  } catch (error) {
    console.error('Report POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
