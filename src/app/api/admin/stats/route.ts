import { NextResponse } from 'next/server';

const DB_URL = process.env.SUPABASE_DB_URL!;

async function queryDatabase(query: string) {
  const { Client } = await import('pg');
  const client = new Client({ connectionString: DB_URL });
  
  try {
    await client.connect();
    const result = await client.query(query);
    return result.rows;
  } finally {
    await client.end();
  }
}

export async function GET() {
  try {
    const [
      usersResult,
      ordersResult,
      revenueResult,
      packagesResult,
      blogsResult,
      quotesResult
    ] = await Promise.all([
      queryDatabase('SELECT COUNT(*) as count FROM users'),
      queryDatabase('SELECT COUNT(*) as count FROM orders'),
      queryDatabase("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE payment_status = 'completed'"),
      queryDatabase('SELECT COUNT(*) as count FROM packages WHERE is_active = true'),
      queryDatabase('SELECT COUNT(*) as count FROM blog_posts WHERE is_published = true'),
      queryDatabase('SELECT COUNT(*) as count FROM daily_quotes WHERE is_active = true')
    ]);

    return NextResponse.json({
      totalUsers: parseInt(usersResult[0]?.count || '0'),
      totalOrders: parseInt(ordersResult[0]?.count || '0'),
      totalRevenue: parseFloat(revenueResult[0]?.total || '0'),
      activePackages: parseInt(packagesResult[0]?.count || '0'),
      publishedBlogs: parseInt(blogsResult[0]?.count || '0'),
      activeQuotes: parseInt(quotesResult[0]?.count || '0')
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
      activePackages: 0,
      publishedBlogs: 0,
      activeQuotes: 0
    });
  }
}
