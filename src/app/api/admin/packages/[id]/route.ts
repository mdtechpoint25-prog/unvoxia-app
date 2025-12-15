import { NextResponse } from 'next/server';

const DB_URL = process.env.SUPABASE_DB_URL!;

async function queryDatabase(query: string, params?: any[]) {
  const { Client } = await import('pg');
  const client = new Client({ connectionString: DB_URL });
  
  try {
    await client.connect();
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    await client.end();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, type, price, description, features, is_active } = body;
    
    const result = await queryDatabase(
      `UPDATE packages 
       SET name = $1, type = $2, price = $3, description = $4, 
           features = $5, is_active = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [name, type, price, description, JSON.stringify(features), is_active, params.id]
    );
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await queryDatabase('DELETE FROM packages WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
