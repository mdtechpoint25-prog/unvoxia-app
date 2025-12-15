import { NextResponse } from 'next/server';
import { queryDatabase } from '@/lib/db';

export async function GET() {
  try {
    const orders = await queryDatabase(`
      SELECT 
        o.*,
        u.name as user_name,
        u.email as user_email,
        json_agg(
          json_build_object(
            'package_name', p.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) FILTER (WHERE oi.id IS NOT NULL) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN packages p ON oi.package_id = p.id
      GROUP BY o.id, u.name, u.email
      ORDER BY o.created_at DESC
    `);
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
