import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

// GET /api/users/check-username - Check if username is available
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      // Return available if database not configured (dev mode)
      return NextResponse.json({ available: true });
    }

    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username')?.toLowerCase().trim();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Validate format
    const usernameRegex = /^[a-z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { available: false, reason: 'Invalid format' },
        { status: 200 }
      );
    }

    // Check if username exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    return NextResponse.json({
      available: !existingUser,
    });

  } catch (error) {
    console.error('Check username error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
