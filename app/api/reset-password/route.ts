import { NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { access_token, password } = await request.json();

    if (!access_token || !password) {
      return NextResponse.json({ error: 'Access token and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Use Supabase Auth to update user password
    // The access_token is passed from the URL after user clicks reset link
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      access_token, // This would be the user ID from the session
      { password }
    );

    if (error) {
      console.error('Password update error:', error);
      return NextResponse.json({ error: 'Failed to reset password' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
