import { NextResponse } from 'next/server';
import { query, execute, generateId } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';

// Get all prompts (admin view)
export async function GET() {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get all template prompts (no user_id)
    const prompts = await query(
      `SELECT * FROM daily_prompts WHERE user_id IS NULL ORDER BY created_at DESC`
    );

    return NextResponse.json({ prompts });
  } catch (error) {
    console.error('Admin prompts GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Create a new prompt template
export async function POST(request: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt text is required' }, { status: 400 });
    }

    const id = generateId();
    await execute(
      `INSERT INTO daily_prompts (id, user_id, prompt) VALUES (?, NULL, ?)`,
      [id, prompt.trim()]
    );

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error('Admin prompts POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
