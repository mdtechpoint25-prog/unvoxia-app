import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

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

// GET /api/prompts/today - Get today's prompt
export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const today = new Date().toISOString().split('T')[0];

    // Get today's prompt
    let { data: prompt } = await supabaseAdmin
      .from('daily_prompts')
      .select('*')
      .eq('prompt_date', today)
      .single();

    // If no prompt for today, get a random one or create one
    if (!prompt) {
      // Try to get any existing prompt
      const { data: anyPrompt } = await supabaseAdmin
        .from('daily_prompts')
        .select('*')
        .limit(1)
        .single();

      if (anyPrompt) {
        prompt = anyPrompt;
      } else {
        // Create a default prompt
        const defaultPrompts = [
          "What's something you've never told anyone?",
          "What would you say to your younger self?",
          "What's weighing on your mind today?",
          "Describe a moment when you felt truly seen.",
          "What's a fear you've been carrying silently?",
          "What does 'being authentic' mean to you?",
          "Share a struggle you're facing right now.",
          "What's something you wish people understood about you?"
        ];

        const randomPrompt = defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)];

        const { data: newPrompt, error } = await supabaseAdmin
          .from('daily_prompts')
          .insert({
            prompt_text: randomPrompt,
            prompt_date: today,
            category: 'reflection'
          })
          .select()
          .single();

        if (error) {
          return NextResponse.json(
            { error: 'Failed to get prompt' },
            { status: 500 }
          );
        }

        prompt = newPrompt;
      }
    }

    return NextResponse.json({
      prompt
    });

  } catch (error) {
    console.error('Get prompt error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/prompts/today - Respond to today's prompt
export async function POST(request: Request) {
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
    const { prompt_id, response, is_private, share_as_post } = await request.json();

    if (!prompt_id) {
      return NextResponse.json(
        { error: 'Prompt ID is required' },
        { status: 400 }
      );
    }

    if (!response || response.trim().length === 0) {
      return NextResponse.json(
        { error: 'Response is required' },
        { status: 400 }
      );
    }

    // Check if prompt exists
    const { data: prompt, error: promptError } = await supabase
      .from('daily_prompts')
      .select('*')
      .eq('id', prompt_id)
      .single();

    if (promptError || !prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      );
    }

    // Check if already responded
    const { data: existingResponse } = await supabase
      .from('prompt_responses')
      .select('id')
      .eq('user_id', user.id)
      .eq('prompt_id', prompt_id)
      .single();

    if (existingResponse) {
      // Update existing response
      const { data: updated, error: updateError } = await supabase
        .from('prompt_responses')
        .update({
          response: response.trim(),
          is_private: is_private !== false
        })
        .eq('id', existingResponse.id)
        .select()
        .single();

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update response' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        response: updated,
        message: 'Response updated'
      });
    }

    // Create new response
    const { data: newResponse, error: insertError } = await supabase
      .from('prompt_responses')
      .insert({
        user_id: user.id,
        prompt_id,
        response: response.trim(),
        is_private: is_private !== false
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to save response' },
        { status: 500 }
      );
    }

    // If user wants to share as a post
    if (share_as_post && !is_private) {
      await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: `${prompt.prompt_text}\n\n${response.trim()}`,
          post_type: 'experience',
          allow_comments: true,
          is_anonymous: true
        });
    }

    return NextResponse.json({
      success: true,
      response: newResponse,
      message: 'Response saved!'
    }, { status: 201 });

  } catch (error) {
    console.error('Respond to prompt error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
