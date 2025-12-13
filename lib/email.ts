import nodemailer from 'nodemailer';

// Email addresses configuration
export const EMAIL_ADDRESSES = {
  noreply: process.env.SMTP_EMAIL_NOREPLY || 'noreply@nomaworld.co.ke',
  info: process.env.SMTP_EMAIL_INFO || 'info@nomaworld.co.ke',
  support: process.env.SMTP_EMAIL_SUPPORT || 'support@nomaworld.co.ke',
  default: process.env.SMTP_DEFAULT_SENDER || 'noreply@nomaworld.co.ke',
  replyTo: process.env.SMTP_REPLY_TO || 'support@nomaworld.co.ke'
};

export type EmailSender = 'noreply' | 'info' | 'support';

// Check if email is configured
function isEmailConfigured(): boolean {
  const pass = process.env.SMTP_PASS;
  return !!(pass && pass.length > 5 && !pass.includes('your-'));
}

// Create SMTP transporter
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.nomaworld.co.ke';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = EMAIL_ADDRESSES.default;
  const pass = process.env.SMTP_PASS || '';

  console.log(`?? SMTP: ${host}:${port} | User: ${user}`);

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    requireTLS: port === 587,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000
  });
}

// Verify SMTP connection
export async function verifyEmailConnection(): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    return { success: false, error: 'SMTP_PASS not configured' };
  }
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('? SMTP connection verified');
    return { success: true };
  } catch (error: any) {
    console.error('? SMTP connection failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Send email function
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  sender?: EmailSender;
  senderName?: string;
}): Promise<void> {
  const { to, subject, html, sender = 'noreply', senderName } = options;

  if (!isEmailConfigured()) {
    console.warn('?? SMTP_PASS not configured');
    if (process.env.NODE_ENV === 'development') {
      console.log(`?? [DEV] To: ${to} | Subject: ${subject}`);
      return;
    }
    throw new Error('Email service not configured');
  }

  const transporter = createTransporter();
  const fromEmail = EMAIL_ADDRESSES[sender] || EMAIL_ADDRESSES.default;

  console.log(`?? Sending to ${to} from ${fromEmail}...`);

  try {
    const info = await transporter.sendMail({
      from: `"${senderName || 'NOMA'}" <${fromEmail}>`,
      to,
      subject,
      html,
      replyTo: EMAIL_ADDRESSES.replyTo
    });
    console.log(`? Email sent: ${info.messageId}`);
  } catch (error: any) {
    console.error(`? Email failed: ${error.message}`);
    throw error;
  }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export async function sendVerificationEmail(to: string, code: string): Promise<void> {
  console.log(`?? Verification code for ${to}: ${code}`);
  
  await sendEmail({
    to,
    subject: `NOMA Verification Code: ${code}`,
    sender: 'noreply',
    senderName: 'NOMA Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1ABC9C, #9B59B6); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">Welcome to NOMA</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p>Your verification code is:</p>
          <div style="background: #f5f5f5; border: 2px dashed #1ABC9C; padding: 20px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #1ABC9C; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #666;">This code expires in 10 minutes.</p>
        </div>
      </div>
    `
  });
}

export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  await sendEmail({
    to,
    subject: 'Reset your NOMA password',
    sender: 'noreply',
    senderName: 'NOMA Security',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1ABC9C, #9B59B6); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">Password Reset</h1>
        </div>
        <div style="padding: 30px; background: #fff; text-align: center;">
          <p>Click below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; background: #1ABC9C; color: #fff; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0;">Reset Password</a>
          <p style="color: #666;">This link expires in 1 hour.</p>
        </div>
      </div>
    `
  });
}

export async function sendOTPEmail(to: string, code: string): Promise<void> {
  await sendEmail({
    to,
    subject: `NOMA Login Code: ${code}`,
    sender: 'noreply',
    senderName: 'NOMA Security',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1ABC9C, #9B59B6); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">Login Code</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p>Your login code is:</p>
          <div style="background: #f5f5f5; border: 2px dashed #1ABC9C; padding: 20px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #1ABC9C; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #666;">This code expires in 10 minutes.</p>
        </div>
      </div>
    `
  });
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getEmailConfig() {
  return {
    host: process.env.SMTP_HOST || 'smtp.nomaworld.co.ke',
    port: parseInt(process.env.SMTP_PORT || '587'),
    authUser: EMAIL_ADDRESSES.default,
    replyTo: EMAIL_ADDRESSES.replyTo,
    configured: isEmailConfigured(),
    emails: EMAIL_ADDRESSES
  };
}

