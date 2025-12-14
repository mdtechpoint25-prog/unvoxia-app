import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/turso';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { emailOrUsername, password } = await request.json();

    if (!emailOrUsername || !password) {
      return NextResponse.json({ error: 'Email/username and password are required' }, { status: 400 });
    }

    // Find user by email or username
    const user = await queryOne<{
      id: string;
      username: string;
      email: string;
      password_hash: string;
      email_verified: number;
    }>(
      'SELECT id, username, email, password_hash, email_verified FROM users WHERE email = ? OR username = ?',
      [emailOrUsername, emailOrUsername]
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if email is verified
    if (!user.email_verified) {
      return NextResponse.json({ error: 'Please verify your email first' }, { status: 403 });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Update last login
    await execute(
      'UPDATE users SET updated_at = ? WHERE id = ?',
      [new Date().toISOString(), user.id]
    );

    // Set session cookie (simple token for now)
    const sessionToken = Buffer.from(JSON.stringify({
      userId: user.id,
      username: user.username,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    })).toString('base64');

    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({
      ok: true,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}