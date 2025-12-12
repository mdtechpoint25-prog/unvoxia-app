import { NextResponse } from 'next/server';
import { query, queryOne, execute, generateId } from '@/lib/turso';
import { sendVerificationEmail, generateOTP } from '@/lib/email';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, email, phone, password } = await request.json();

    // Validate input
    if (!username || !email || !phone || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if username already exists
    const existingUsername = await queryOne(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUsername) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    // Check if email already exists
    const existingEmail = await queryOne(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingEmail) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    // Generate user ID
    const userId = generateId();

    // Insert user with pending verification
    await execute(
      `INSERT INTO users (id, username, email, phone, password_hash, email_verified, otp_code, otp_expires)
       VALUES (?, ?, ?, ?, ?, 0, ?, ?)`,
      [userId, username, email, phone, passwordHash, otp, otpExpiry]
    );

    // Send verification email
    try {
      await sendVerificationEmail(email, otp);
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue even if email fails - user can request resend
    }

    return NextResponse.json({ 
      ok: true, 
      message: 'Account created! Please check your email for verification code.',
      userId
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}