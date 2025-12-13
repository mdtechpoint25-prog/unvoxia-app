import { NextResponse } from 'next/server';
import { 
  verifyEmailConnection, 
  sendVerificationEmail, 
  generateOTP, 
  getEmailConfig,
  EMAIL_ADDRESSES,
  type EmailSender
} from '@/lib/email';

// Test email configuration (only in development)
export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const config = getEmailConfig();

  // Test connection
  let connectionStatus = 'Not tested';
  try {
    const isConnected = await verifyEmailConnection();
    connectionStatus = isConnected ? '? Connected' : '? Failed';
  } catch (error: any) {
    connectionStatus = `? Error: ${error.message}`;
  }

  return NextResponse.json({
    ok: true,
    smtp: {
      host: config.host,
      port: config.port,
      configured: config.configured
    },
    emails: {
      info: config.emails.info,
      support: config.emails.support,
      noreply: config.emails.noreply,
      default: config.emails.default
    },
    connectionStatus,
    message: config.configured 
      ? 'SMTP configuration looks good'
      : '?? Please set SMTP_PASS in your .env.local file with your actual email password'
  });
}

// Send test email (POST)
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const { email, sender = 'info' } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate sender
    const validSenders: EmailSender[] = ['info', 'support', 'noreply'];
    if (!validSenders.includes(sender)) {
      return NextResponse.json({ 
        error: `Invalid sender. Must be one of: ${validSenders.join(', ')}` 
      }, { status: 400 });
    }

    const testCode = generateOTP();
    const senderEmail = EMAIL_ADDRESSES[sender as EmailSender];

    await sendVerificationEmail(email, testCode);

    return NextResponse.json({
      ok: true,
      message: `Test email sent to ${email}`,
      from: senderEmail,
      code: testCode
    });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
