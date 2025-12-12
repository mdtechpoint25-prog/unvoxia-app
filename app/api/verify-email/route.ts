import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/turso';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    // Get user with matching email
    const user = await queryOne<{
      id: string;
      otp_code: string;
      otp_expires: string;
    }>(
      'SELECT id, otp_code, otp_expires FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check OTP
    if (user.otp_code !== otp) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // Check expiry
    if (!user.otp_expires || new Date(user.otp_expires) < new Date()) {
      return NextResponse.json({ error: 'Verification code expired' }, { status: 400 });
    }

    // Update user as verified
    await execute(
      'UPDATE users SET email_verified = 1, otp_code = NULL, otp_expires = NULL WHERE id = ?',
      [user.id]
    );

    return NextResponse.json({ ok: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
