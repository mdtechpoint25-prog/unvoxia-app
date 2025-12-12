import { NextResponse } from 'next/server';
import { query, execute, generateId } from '@/lib/turso';
import { cookies } from 'next/headers';

async function getUserFromSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    if (decoded.exp < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}

// Get all prompts (admin view)
export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt text is required' }, { status: 400 });
    }

    const promptId = generateId();

    await execute(
      `INSERT INTO daily_prompts (id, user_id, prompt, response) VALUES (?, NULL, ?, NULL)`,
      [promptId, prompt.trim()]
    );

    return NextResponse.json({ 
      ok: true, 
      prompt: { id: promptId, prompt: prompt.trim() } 
    });
  } catch (error) {
    console.error('Admin prompts POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
