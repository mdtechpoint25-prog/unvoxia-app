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

    // Get the flagged post
    const { data: flag, error: fetchError } = await supabase
      .from('flagged_posts')
      .select('post_id')
      .eq('id', id)
      .single();

    if (fetchError || !flag) {
      return NextResponse.json({ error: 'Flagged post not found' }, { status: 404 });
    }

    // Update the flag status
    const newStatus = action === 'dismiss' ? 'dismissed' : 'actioned';
    const { error: updateError } = await supabase
      .from('flagged_posts')
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.userId
      })
      .eq('id', id);

    if (updateError) {
      console.error('Update flag error:', updateError);
      return NextResponse.json({ error: 'Failed to update flag' }, { status: 500 });
    }

    // If action taken, delete the post
    if (action === 'action') {
      await supabase.from('posts').delete().eq('id', flag.post_id);
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
