import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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

    // Get all prompts (template prompts have no user_id)
    const { data: prompts, error } = await supabase
      .from('daily_prompts')
      .select('*')
      .is('user_id', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch prompts error:', error);
      return NextResponse.json({ error: 'Failed to fetch prompts' }, { status: 500 });
    }

    return NextResponse.json({ prompts: prompts || [] });
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

    const { data, error } = await supabase
      .from('daily_prompts')
      .insert({
        prompt: prompt.trim(),
        user_id: null,
        response: null
      })
      .select()
      .single();

    if (error) {
      console.error('Create prompt error:', error);
      return NextResponse.json({ error: 'Failed to create prompt' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, prompt: data });
  } catch (error) {
    console.error('Admin prompts POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
