import { NextResponse } from 'next/server';
import { query } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';
import { sendAnnouncementEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { type, subject, message, recipients } = await request.json();

    // Validate input
    if (!type || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get recipient emails based on type
    let emails: string[] = [];
    
    if (type === 'all') {
      const users = await query('SELECT email FROM users WHERE status = ?', ['active']);
      emails = users.map((u: any) => u.email);
    } else if (type === 'specific' && recipients) {
      emails = recipients;
    } else if (type === 'active') {
      // Users active in last 7 days
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const users = await query(
        `SELECT DISTINCT u.email FROM users u
         WHERE u.id IN (
           SELECT DISTINCT user_id FROM posts WHERE created_at >= ?
           UNION
           SELECT DISTINCT sender_id FROM messages WHERE created_at >= ?
         ) AND u.status = ?`,
        [sevenDaysAgo, sevenDaysAgo, 'active']
      );
      emails = users.map((u: any) => u.email);
    }

    if (emails.length === 0) {
      return NextResponse.json({ error: 'No recipients found' }, { status: 400 });
    }

    // Send emails (in batches to avoid overwhelming the server)
    const batchSize = 50;
    let sentCount = 0;
    let failedCount = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(email => sendAnnouncementEmail(email, subject, message))
      );
      
      sentCount += results.filter(r => r.status === 'fulfilled').length;
      failedCount += results.filter(r => r.status === 'rejected').length;
    }

    return NextResponse.json({
      success: true,
      message: `Sent to ${sentCount} recipients, ${failedCount} failed`,
      sentCount,
      failedCount
    });
  } catch (error) {
    console.error('Admin communications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
