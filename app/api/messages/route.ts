import { NextResponse } from 'next/server';
import { query, queryOne, execute, generateId } from '@/lib/turso';
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

// Get list of conversations and pending chat requests
export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get pending chat requests received
    const pendingRequests = await query(
      `SELECT cr.id, cr.requester_id, cr.created_at, u.username, u.avatar_url
       FROM chat_requests cr
       LEFT JOIN users u ON cr.requester_id = u.id
       WHERE cr.receiver_id = ? AND cr.status = 'pending'
       ORDER BY cr.created_at DESC`,
      [user.userId]
    );

    // Get accepted conversations
    const acceptedRequests = await query(
      `SELECT requester_id, receiver_id FROM chat_requests
       WHERE (requester_id = ? OR receiver_id = ?) AND status = 'accepted'`,
      [user.userId, user.userId]
    );

    const acceptedPartners = new Set<string>();
    acceptedRequests.forEach((req: any) => {
      if (req.requester_id === user.userId) {
        acceptedPartners.add(req.receiver_id);
      } else {
        acceptedPartners.add(req.requester_id);
      }
    });

    // Get all messages for this user
    const messages = await query(
      `SELECT m.*, 
              s.username as sender_username, s.avatar_url as sender_avatar,
              r.username as receiver_username, r.avatar_url as receiver_avatar
       FROM messages m
       LEFT JOIN users s ON m.sender_id = s.id
       LEFT JOIN users r ON m.receiver_id = r.id
       WHERE m.sender_id = ? OR m.receiver_id = ?
       ORDER BY m.created_at DESC`,
      [user.userId, user.userId]
    );

    // Group messages by conversation partner
    const conversationsMap = new Map();
    
    for (const msg of messages as any[]) {
      const partnerId = msg.sender_id === user.userId ? msg.receiver_id : msg.sender_id;
      const partnerUsername = msg.sender_id === user.userId ? msg.receiver_username : msg.sender_username;
      const partnerAvatar = msg.sender_id === user.userId ? msg.receiver_avatar : msg.sender_avatar;
      
      // Only show conversations with accepted partners
      if (!acceptedPartners.has(partnerId)) continue;
      
      if (!conversationsMap.has(partnerId)) {
        conversationsMap.set(partnerId, {
          partnerId,
          partnerUsername: partnerUsername || 'Anonymous',
          partnerAvatar,
          lastMessage: msg.content,
          lastMessageAt: msg.created_at,
          unreadCount: 0,
          isAnonymous: msg.is_anonymous
        });
      }
      
      // Count unread messages
      if (msg.receiver_id === user.userId && !msg.read) {
        const conv = conversationsMap.get(partnerId);
        conv.unreadCount++;
      }
    }

    const conversations = Array.from(conversationsMap.values());

    // Format pending requests
    const formattedRequests = pendingRequests.map((req: any) => ({
      id: req.id,
      requester_id: req.requester_id,
      created_at: req.created_at,
      requester: { username: req.username, avatar_url: req.avatar_url }
    }));

    return NextResponse.json({ 
      conversations,
      pendingRequests: formattedRequests
    });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Send a chat request or message
export async function POST(request: Request) {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { receiverUsername, content, isAnonymous } = await request.json();

    if (!receiverUsername || !content?.trim()) {
      return NextResponse.json({ error: 'Receiver and content are required' }, { status: 400 });
    }

    // Find receiver by username
    const receiver = await queryOne<{ id: string }>(
      'SELECT id FROM users WHERE username = ?',
      [receiverUsername]
    );

    if (!receiver) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (receiver.id === user.userId) {
      return NextResponse.json({ error: 'Cannot message yourself' }, { status: 400 });
    }

    // Check if there's an existing chat request
    const existingRequest = await queryOne<{ id: string; status: string }>(
      `SELECT id, status FROM chat_requests 
       WHERE (requester_id = ? AND receiver_id = ?) OR (requester_id = ? AND receiver_id = ?)`,
      [user.userId, receiver.id, receiver.id, user.userId]
    );

    if (!existingRequest) {
      // No existing request - create a new chat request
      const requestId = generateId();
      await execute(
        `INSERT INTO chat_requests (id, requester_id, receiver_id, status)
         VALUES (?, ?, ?, 'pending')`,
        [requestId, user.userId, receiver.id]
      );

      // Create notification for recipient
      const notifId = generateId();
      await execute(
        `INSERT INTO notifications (id, user_id, type, title, message)
         VALUES (?, ?, 'chat_request', 'New Chat Request', ?)`,
        [notifId, receiver.id, `${user.username} wants to connect with you`]
      );

      return NextResponse.json({
        ok: true,
        type: 'request_sent',
        message: 'Chat request sent! They will need to accept before you can chat.'
      });
    }

    if (existingRequest.status === 'pending') {
      return NextResponse.json({ 
        error: 'Chat request is still pending. Please wait for them to accept.',
        type: 'pending'
      }, { status: 400 });
    }

    if (existingRequest.status === 'declined') {
      return NextResponse.json({ 
        error: 'This user has declined your chat request.',
        type: 'declined'
      }, { status: 400 });
    }

    // Chat request is accepted - send the message
    const messageId = generateId();
    await execute(
      `INSERT INTO messages (id, sender_id, receiver_id, content, is_anonymous)
       VALUES (?, ?, ?, ?, ?)`,
      [messageId, user.userId, receiver.id, content.trim(), isAnonymous ? 1 : 0]
    );

    return NextResponse.json({
      ok: true,
      type: 'message_sent',
      message: { id: messageId, content: content.trim() }
    });
  } catch (error) {
    console.error('Messages POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

