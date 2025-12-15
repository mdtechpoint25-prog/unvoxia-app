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

export async function GET() {
  try {
    const packages = await queryDatabase(
      'SELECT * FROM packages ORDER BY created_at DESC'
    );
    
    const formattedPackages = packages.map(pkg => ({
      ...pkg,
      features: typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features
    }));
    
    return NextResponse.json(formattedPackages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, price, description, features, is_active } = body;
    
    const result = await queryDatabase(
      `INSERT INTO packages (name, type, price, description, features, is_active) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, type, price, description, JSON.stringify(features), is_active]
    );
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
