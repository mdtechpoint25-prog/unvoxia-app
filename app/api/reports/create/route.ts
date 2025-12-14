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

// POST /api/reports/create - Report a post, comment, or user
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
    const { post_id, comment_id, user_id, reason, details } = await request.json();

    // Must report at least one thing
    if (!post_id && !comment_id && !user_id) {
      return NextResponse.json(
        { error: 'Must specify a post, comment, or user to report' },
        { status: 400 }
      );
    }

    // Validate reason
    const validReasons = [
      'harassment',
      'hate_speech',
      'spam',
      'self_harm',
      'violence',
      'misinformation',
      'inappropriate',
      'other'
    ];

    if (!reason || !validReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Valid reason is required' },
        { status: 400 }
      );
    }

    // Can't report yourself
    if (user_id === user.id) {
      return NextResponse.json(
        { error: 'You cannot report yourself' },
        { status: 400 }
      );
    }

    // Create report
    const { data: report, error: insertError } = await supabase
      .from('reports')
      .insert({
        reporter_id: user.id,
        post_id: post_id || null,
        comment_id: comment_id || null,
        reported_user_id: user_id || null,
        reason,
        details: details || null,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      // Check for duplicate report
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'You have already reported this' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to create report' },
        { status: 500 }
      );
    }

    // If this is a severe report (hate speech, self harm), auto-flag the content
    const severeReasons = ['hate_speech', 'self_harm', 'violence'];
    if (severeReasons.includes(reason)) {
      if (post_id) {
        await supabaseAdmin
          .from('posts')
          .update({ is_flagged: true })
          .eq('id', post_id);
      }
      if (comment_id) {
        await supabaseAdmin
          .from('comments')
          .update({ is_flagged: true })
          .eq('id', comment_id);
      }
    }

    return NextResponse.json({
      success: true,
      report_id: report.id,
      message: 'Thank you for your report. We will review it shortly.'
    }, { status: 201 });

  } catch (error) {
    console.error('Create report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
