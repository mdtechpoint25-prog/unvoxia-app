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

// GET /api/circles - Get all circles or joined circles
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const joined_only = searchParams.get('joined_only') === 'true';

    const auth = await getAuthUser(request);

    // Get all circles
    const { data: circles, error } = await supabaseAdmin
      .from('circles')
      .select('*')
      .order('member_count', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If user is authenticated, check which circles they've joined
    let joinedCircleIds: Set<string> = new Set();

    if (auth) {
      const { data: memberships } = await supabaseAdmin
        .from('circle_members')
        .select('circle_id')
        .eq('user_id', auth.user.id);

      joinedCircleIds = new Set(memberships?.map(m => m.circle_id) || []);
    }

    let result = circles?.map(circle => ({
      ...circle,
      is_joined: joinedCircleIds.has(circle.id)
    })) || [];

    if (joined_only && auth) {
      result = result.filter(c => c.is_joined);
    }

    return NextResponse.json({
      circles: result
    });

  } catch (error) {
    console.error('Get circles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/circles - Join or leave a circle
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
    const { circle_id, action } = await request.json();

    if (!circle_id) {
      return NextResponse.json(
        { error: 'Circle ID is required' },
        { status: 400 }
      );
    }

    // Check if circle exists
    const { data: circle, error: circleError } = await supabase
      .from('circles')
      .select('id, name, member_count')
      .eq('id', circle_id)
      .single();

    if (circleError || !circle) {
      return NextResponse.json(
        { error: 'Circle not found' },
        { status: 404 }
      );
    }

    // Check current membership
    const { data: membership } = await supabase
      .from('circle_members')
      .select('*')
      .eq('circle_id', circle_id)
      .eq('user_id', user.id)
      .single();

    if (action === 'leave' || (membership && !action)) {
      // Leave circle
      if (!membership) {
        return NextResponse.json(
          { error: 'You are not a member of this circle' },
          { status: 400 }
        );
      }

      const { error: deleteError } = await supabase
        .from('circle_members')
        .delete()
        .eq('circle_id', circle_id)
        .eq('user_id', user.id);

      if (deleteError) {
        return NextResponse.json(
          { error: 'Failed to leave circle' },
          { status: 500 }
        );
      }

      // Decrement member count
      const currentCount = (circle as { member_count?: number }).member_count || 0;
      await supabaseAdmin
        .from('circles')
        .update({ member_count: Math.max(0, currentCount - 1) })
        .eq('id', circle_id);

      return NextResponse.json({
        success: true,
        joined: false,
        message: `Left ${circle.name}`
      });
    }

    // Join circle
    if (membership) {
      return NextResponse.json({
        success: true,
        joined: true,
        message: `Already a member of ${circle.name}`
      });
    }

    const { error: insertError } = await supabase
      .from('circle_members')
      .insert({
        circle_id,
        user_id: user.id
      });

    if (insertError) {
      return NextResponse.json(
        { error: 'Failed to join circle' },
        { status: 500 }
      );
    }

    // Increment member count
    const currentMemberCount = (circle as { member_count?: number }).member_count || 0;
    await supabaseAdmin
      .from('circles')
      .update({ member_count: currentMemberCount + 1 })
      .eq('id', circle_id);

    return NextResponse.json({
      success: true,
      joined: true,
      message: `Joined ${circle.name}!`
    });

  } catch (error) {
    console.error('Join/leave circle error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
