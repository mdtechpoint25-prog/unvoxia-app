import { NextResponse } from 'next/server';
import { queryDatabase } from '@/lib/db';

export async function GET() {
  try {
    const users = await queryDatabase(`
      SELECT 
        u.*,
        COUNT(DISTINCT up.id) as progress_count,
        COUNT(DISTINCT CASE WHEN up.completed = true THEN up.id END) as completed_count
      FROM users u
      LEFT JOIN user_progress up ON u.id = up.user_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
