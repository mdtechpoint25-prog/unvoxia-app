import { NextResponse } from 'next/server';
import { queryDatabase } from '@/lib/db';

export async function GET() {
  try {
    const quotes = await queryDatabase(
      'SELECT * FROM daily_quotes ORDER BY scheduled_date DESC'
    );
    
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quote, author, category, is_active, scheduled_date } = body;
    
    const result = await queryDatabase(
      `INSERT INTO daily_quotes (quote, author, category, is_active, scheduled_date) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [quote, author, category, is_active, scheduled_date]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating quote:', error);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}
