import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { syncToTurso, initTursoSchema } from '@/lib/turso';

export async function POST(request: NextRequest) {
  try {
    const { table } = await request.json();

    if (!table) {
      return NextResponse.json(
        { error: 'Table name is required' },
        { status: 400 }
      );
    }

    await initTursoSchema();

    const { data, error } = await supabase.from(table).select('*');

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        message: `No data to sync from table: ${table}`,
        count: 0,
      });
    }

    await syncToTurso(table, data);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${data.length} rows to Turso`,
      count: data.length,
    });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: 'Failed to backup data to Turso' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await initTursoSchema();

    const tables = ['packages', 'users', 'orders', 'order_items', 'basket_items', 'user_progress'];
    const results = [];

    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('*');
      
      if (error) {
        console.error(`Error fetching ${table}:`, error);
        continue;
      }

      if (data && data.length > 0) {
        await syncToTurso(table, data);
        results.push({ table, count: data.length });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Full backup completed',
      results,
    });
  } catch (error) {
    console.error('Full backup error:', error);
    return NextResponse.json(
      { error: 'Failed to complete full backup' },
      { status: 500 }
    );
  }
}
