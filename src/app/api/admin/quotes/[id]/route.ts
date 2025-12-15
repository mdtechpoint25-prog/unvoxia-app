import { NextResponse } from 'next/server';
import { queryDatabase } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { quote, author, category, is_active, scheduled_date } = body;
    
    const result = await queryDatabase(
      `UPDATE daily_quotes 
       SET quote = $1, author = $2, category = $3, is_active = $4, 
           scheduled_date = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [quote, author, category, is_active, scheduled_date, params.id]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await queryDatabase('DELETE FROM daily_quotes WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting quote:', error);
    return NextResponse.json({ error: 'Failed to delete quote' }, { status: 500 });
  }
}
