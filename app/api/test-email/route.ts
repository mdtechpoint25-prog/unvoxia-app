import { NextResponse } from 'next/server';
import { verifyEmailConnection, sendVerificationEmail, generateOTP } from '@/lib/email';

// Test email configuration (only in development)
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const config = {
    host: process.env.SMTP_HOST || 'not set',
    port: process.env.SMTP_PORT || 'not set',
    user: process.env.SMTP_USER || 'not set',
    passSet: process.env.SMTP_PASS && process.env.SMTP_PASS !== 'your-email-password-here' ? 'Yes' : 'No (using placeholder)'
  };

  // Test connection
  let connectionStatus = 'Not tested';
  try {
    const isConnected = await verifyEmailConnection();
    connectionStatus = isConnected ? 'Connected' : 'Failed';
  } catch (error: any) {
    connectionStatus = `Error: ${error.message}`;
  }

  return NextResponse.json({
    ok: true,
    config,
    connectionStatus,
    message: config.passSet === 'No (using placeholder)' 
      ? 'Please set SMTP_PASS in your .env.local file with your actual email password'
      : 'SMTP configuration looks good'
  });
}

// Send test email (POST)
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const testCode = generateOTP();

    await sendVerificationEmail(email, testCode);

    return NextResponse.json({
      ok: true,
      message: `Test email sent to ${email}`,
      code: testCode
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
