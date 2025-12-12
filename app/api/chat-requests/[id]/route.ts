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

    // Get the chat request
    const { data: chatRequest, error: fetchError } = await supabase
      .from('chat_requests')
      .select('*, requester:requester_id (username)')
      .eq('id', id)
      .single();

    if (fetchError || !chatRequest) {
      return NextResponse.json({ error: 'Chat request not found' }, { status: 404 });
    }

    // Verify the user is the recipient
    if (chatRequest.recipient_id !== user.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update the request status
    const newStatus = action === 'accept' ? 'accepted' : 'declined';
    const { error: updateError } = await supabase
      .from('chat_requests')
      .update({
        status: newStatus,
        responded_at: new Date().toISOString()
      })
      .eq('id', id);

    if (updateError) {
      console.error('Update chat request error:', updateError);
      return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }

    // If accepted, create the initial message from the request
    if (action === 'accept' && chatRequest.message) {
      await supabase.from('messages').insert({
        sender_id: chatRequest.requester_id,
        receiver_id: user.userId,
        content: chatRequest.message
      });

      // Notify the requester
      await supabase.from('notifications').insert({
        user_id: chatRequest.requester_id,
        type: 'chat_request',
        title: 'Chat Request Accepted!',
        message: `${user.username} accepted your chat request. You can now message them!`,
        link: '/messages'
      });
    }

    return NextResponse.json({
      ok: true,
      status: newStatus,
      message: action === 'accept' 
        ? 'Chat request accepted! You can now message each other.'
        : 'Chat request declined.'
    });
  } catch (error) {
    console.error('Chat request PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
