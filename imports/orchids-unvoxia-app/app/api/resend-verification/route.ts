import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/turso';
import { sendVerificationEmail, generateOTP } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user by email
    const user = await queryOne<{
      id: string;
      email: string;
      email_verified: number;
    }>(
      'SELECT id, email, email_verified FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    if (!user) {
      return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
    }

    // Check if already verified
    if (user.email_verified) {
      return NextResponse.json({ error: 'Email is already verified' }, { status: 400 });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    // Update user with new OTP
    await execute(
      'UPDATE users SET otp_code = ?, otp_expires = ?, updated_at = ? WHERE id = ?',
      [otp, otpExpiry, new Date().toISOString(), user.id]
    );

    // Send verification email
    let emailSent = false;
    try {
      await sendVerificationEmail(email, otp);
      emailSent = true;
    } catch (emailError: any) {
      console.error('Email sending error:', emailError.message);
    }

    return NextResponse.json({
      ok: true,
      message: emailSent 
        ? 'Verification code sent! Please check your email.'
        : 'Could not send email. Please try again or contact support.',
      emailSent,
      // In development, return the OTP for testing
      ...(process.env.NODE_ENV === 'development' && { devOtp: otp })
    });
  } catch (error: any) {
    console.error('Resend verification error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}
