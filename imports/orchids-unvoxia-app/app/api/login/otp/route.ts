import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/turso';
import { cookies } from 'next/headers';

// Generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email, otp, action } = await request.json();

    if (action === 'request') {
      // Request OTP
      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }

      // Find user by email
      const user = await queryOne<{ id: string; email: string; status: string }>(
        'SELECT id, email, status FROM users WHERE email = ?',
        [email.toLowerCase()]
      );

      if (!user) {
        return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
      }

      if (user.status === 'banned') {
        return NextResponse.json({ error: 'This account has been suspended' }, { status: 403 });
      }

      // Generate OTP and set expiry (10 minutes)
      const otpCode = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // Save OTP to user record
      await execute(
        'UPDATE users SET otp_code = ?, otp_expires = ? WHERE id = ?',
        [otpCode, otpExpiry, user.id]
      );

      // In production, send email with OTP
      console.log(`OTP for ${email}: ${otpCode}`);

      return NextResponse.json({ 
        ok: true, 
        message: 'OTP sent to your email',
        ...(process.env.NODE_ENV === 'development' && { devOtp: otpCode })
      });
    }

    if (action === 'verify') {
      // Verify OTP
      if (!email || !otp) {
        return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
      }

      // Find user and verify OTP
      const user = await queryOne<{
        id: string;
        username: string;
        email: string;
        otp_code: string;
        otp_expires: string;
        status: string;
      }>(
        'SELECT id, username, email, otp_code, otp_expires, status FROM users WHERE email = ?',
        [email.toLowerCase()]
      );

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      if (user.status === 'banned') {
        return NextResponse.json({ error: 'This account has been suspended' }, { status: 403 });
      }

      // Check OTP
      if (!user.otp_code || user.otp_code !== otp) {
        return NextResponse.json({ error: 'Invalid OTP code' }, { status: 400 });
      }

      // Check expiry
      if (!user.otp_expires || new Date(user.otp_expires) < new Date()) {
        return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
      }

      // Clear OTP and update last login
      await execute(
        'UPDATE users SET otp_code = NULL, otp_expires = NULL, updated_at = ? WHERE id = ?',
        [new Date().toISOString(), user.id]
      );

      // Create session
      const session = {
        userId: user.id,
        username: user.username,
        email: user.email,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      };

      const sessionToken = Buffer.from(JSON.stringify(session)).toString('base64');

      const cookieStore = await cookies();
      cookieStore.set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 // 7 days
      });

      return NextResponse.json({
        ok: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('OTP login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
