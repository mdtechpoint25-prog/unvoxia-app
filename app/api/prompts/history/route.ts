import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from '@/lib/supabase';

// Helper to get user from auth header
async function getAuthUser(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }

  return { user, supabase };
}

// GET /api/prompts/history - Get user's prompt response history
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const auth = await getAuthUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { user, supabase } = auth;
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '30'), 100);

    const { data: responses, error } = await supabase
      .from('prompt_responses')
      .select(`
        *,
        daily_prompts:prompt_id (prompt_text, prompt_date, category)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get streak info
    const { data: allResponses } = await supabase
      .from('prompt_responses')
      .select('created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    let streak = 0;
    let lastDate: Date | null = null;

    allResponses?.forEach(r => {
      const date = new Date(r.created_at);
      date.setHours(0, 0, 0, 0);

      if (!lastDate) {
        // First response - check if it's today or yesterday
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.getTime() === today.getTime() || date.getTime() === yesterday.getTime()) {
          streak = 1;
          lastDate = date;
        }
      } else {
        // Check if it's the day before lastDate
        const expectedDate = new Date(lastDate);
        expectedDate.setDate(expectedDate.getDate() - 1);

        if (date.getTime() === expectedDate.getTime()) {
          streak++;
          lastDate = date;
        } else if (date.getTime() < expectedDate.getTime()) {
          // Gap in streak, stop counting
          return;
        }
      }
    });

    return NextResponse.json({
      responses: responses || [],
      streak,
      total_responses: allResponses?.length || 0
    });

  } catch (error) {
    console.error('Get prompt history error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
