import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, email, status')
        .eq('email', email.toLowerCase())
        .single();

      if (userError || !user) {
        return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
      }

      if (user.status === 'banned') {
        return NextResponse.json({ error: 'This account has been suspended' }, { status: 403 });
      }

      // Generate OTP and set expiry (10 minutes)
      const otpCode = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

      // Save OTP to user record
      const { error: updateError } = await supabase
        .from('users')
        .update({
          otp_code: otpCode,
          otp_expiry: otpExpiry
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Update OTP error:', updateError);
        return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
      }

      // In production, send email with OTP
      // For now, log it (in development)
      console.log(`OTP for ${email}: ${otpCode}`);

      // TODO: Send actual email with OTP
      // await sendEmail({
      //   to: email,
      //   subject: 'Your NOMA Login Code',
      //   body: `Your login code is: ${otpCode}. It expires in 10 minutes.`
      // });

      return NextResponse.json({ 
        ok: true, 
        message: 'OTP sent to your email',
        // Remove this in production - only for testing
        ...(process.env.NODE_ENV === 'development' && { devOtp: otpCode })
      });
    }

    if (action === 'verify') {
      // Verify OTP
      if (!email || !otp) {
        return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
      }

      // Find user and verify OTP
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id, username, email, otp_code, otp_expiry, status')
        .eq('email', email.toLowerCase())
        .single();

      if (userError || !user) {
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
      if (!user.otp_expiry || new Date(user.otp_expiry) < new Date()) {
        return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
      }

      // Clear OTP and update last login
      await supabase
        .from('users')
        .update({
          otp_code: null,
          otp_expiry: null,
          last_login: new Date().toISOString()
        })
        .eq('id', user.id);

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
