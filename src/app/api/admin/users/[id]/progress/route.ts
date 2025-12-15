import { NextResponse } from 'next/server';
import { queryDatabase } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const progress = await queryDatabase(
      'SELECT * FROM user_progress WHERE user_id = $1 ORDER BY created_at DESC',
      [params.id]
    );
    
    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json({ error: 'Failed to fetch user progress' }, { status: 500 });
  }
}
