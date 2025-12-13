import { NextResponse } from 'next/server';
import { 
  verifyEmailConnection, 
  getEmailConfig, 
  sendVerificationEmail,
  sendWelcomeEmail,
  sendSupportEmail,
  generateOTP,
  EMAIL_ADDRESSES
} from '@/lib/email';

// GET - Check email configuration
export async function GET() {
  const config = getEmailConfig();

  let connectionResult = { success: false, error: 'Not tested' };
  
  if (config.configured) {
    connectionResult = await verifyEmailConnection();
  }

  return NextResponse.json({
    ok: true,
    smtp: {
      host: config.host,
      port: config.port,
      configured: config.configured
    },
    emailRoles: {
      'noreply@mail.nomaworld.co.ke': 'Verification codes, OTP, Password reset',
      'info@mail.nomaworld.co.ke': 'Welcome emails, Announcements, Newsletters',
      'support@mail.nomaworld.co.ke': 'Support tickets, Report confirmations, Account issues'
    },
    replyTo: config.replyTo,
    connection: connectionResult,
    message: config.configured 
      ? (connectionResult.success ? '? Email is configured and working!' : `? Connection failed: ${connectionResult.error}`)
      : '⚠️ SMTP_PASS not set. Please update your .env.local file.'
  });
}

// POST - Send test email
export async function POST(request: Request) {
  try {
    const { email, type = 'verification' } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const config = getEmailConfig();
    
    if (!config.configured) {
      return NextResponse.json({ 
        ok: false,
        error: 'SMTP_PASS not configured'
      }, { status: 400 });
    }

    let result: { sender: string; description: string };

    switch (type) {
      case 'verification':
        const code = generateOTP();
        await sendVerificationEmail(email, code);
        result = { 
          sender: EMAIL_ADDRESSES.noreply,
          description: `Verification code: ${code}`
        };
        break;
        
      case 'welcome':
        await sendWelcomeEmail(email, 'TestUser');
        result = { 
          sender: EMAIL_ADDRESSES.info,
          description: 'Welcome email sent'
        };
        break;
        
      case 'support':
        await sendSupportEmail(email, 'Test Support', '<p>This is a test support email from NOMA.</p>');
        result = { 
          sender: EMAIL_ADDRESSES.support,
          description: 'Support email sent'
        };
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid type. Use: verification, welcome, support' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      message: `? Test email sent to ${email}`,
      type,
      from: result.sender,
      details: result.description
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({
      ok: false,
      error: error.message
    }, { status: 500 });
  }
}
