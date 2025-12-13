import nodemailer from 'nodemailer';

// ============================================
// EMAIL ADDRESSES CONFIGURATION
// ============================================
// noreply@nomaworld.co.ke - Verification, OTP, Password Reset (no replies)
// info@nomaworld.co.ke - Welcome emails, Announcements, Newsletters
// support@nomaworld.co.ke - Support responses, Reply-To header
// ============================================

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
  const host = process.env.SMTP_HOST || 'mail.nomaworld.co.ke';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = EMAIL_ADDRESSES.default;
  const pass = process.env.SMTP_PASS || '';

  console.log(`📧 SMTP: ${host}:${port} | User: ${user}`);

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
  customReplyTo?: string;
}): Promise<void> {
  const { to, subject, html, sender = 'noreply', senderName, customReplyTo } = options;

  if (!isEmailConfigured()) {
    console.warn('⚠️ SMTP_PASS not configured');
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔧 [DEV] To: ${to} | From: ${sender} | Subject: ${subject}`);
      return;
    }
    throw new Error('Email service not configured');
  }

  const transporter = createTransporter();
  const fromEmail = EMAIL_ADDRESSES[sender] || EMAIL_ADDRESSES.default;
  
  // Set Reply-To based on sender type
  const replyTo = customReplyTo || (sender === 'noreply' ? EMAIL_ADDRESSES.support : fromEmail);

  console.log(`📤 Sending to ${to} from ${fromEmail} (Reply-To: ${replyTo})...`);

  try {
    const info = await transporter.sendMail({
      from: `"${senderName || 'NOMA'}" <${fromEmail}>`,
      to,
      subject,
      html,
      replyTo
    });
    console.log(`? Email sent: ${info.messageId}`);
  } catch (error: any) {
    console.error(`? Email failed: ${error.message}`);
    throw error;
  }
}

// ============================================
// NOREPLY EMAILS (noreply@nomaworld.co.ke)
// - Verification codes
// - OTP login codes  
// - Password reset links
// ============================================

export async function sendVerificationEmail(to: string, code: string): Promise<void> {
  console.log(`🔑 Verification code for ${to}: ${code}`);
  
  await sendEmail({
    to,
    subject: `NOMA Verification Code: ${code}`,
    sender: 'noreply',
    senderName: 'NOMA Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1ABC9C, #9B59B6); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">Welcome to NOMA</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">No Mask World</p>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p style="color: #333; font-size: 16px;">Your verification code is:</p>
          <div style="background: #f5f5f5; border: 2px dashed #1ABC9C; padding: 20px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #1ABC9C; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #666; font-size: 14px;">? This code expires in <strong>10 minutes</strong>.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">If you didn't create an account, please ignore this email.</p>
        </div>
        <div style="background: #f8f9fa; padding: 15px; text-align: center;">
          <p style="color: #999; font-size: 11px; margin: 0;">� ${new Date().getFullYear()} NOMA - No Mask World | nomaworld.co.ke</p>
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
          <p style="color: #333; font-size: 16px;">Click below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #1ABC9C, #16a085); color: #fff; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; font-size: 16px;">Reset Password</a>
          <p style="color: #666; font-size: 14px;">? This link expires in <strong>1 hour</strong>.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
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
          <p style="color: #333; font-size: 16px;">Your login code is:</p>
          <div style="background: #f5f5f5; border: 2px dashed #1ABC9C; padding: 20px; text-align: center; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #1ABC9C; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #666; font-size: 14px;">? This code expires in <strong>10 minutes</strong>.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">If you didn't request this code, someone may be trying to access your account.</p>
        </div>
      </div>
    `
  });
}

// ============================================
// INFO EMAILS (info@nomaworld.co.ke)
// - Welcome emails
// - Announcements
// - Newsletters
// ============================================

export async function sendWelcomeEmail(to: string, username: string): Promise<void> {
  await sendEmail({
    to,
    subject: 'Welcome to NOMA! 🎉',
    sender: 'info',
    senderName: 'NOMA Team',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1ABC9C, #9B59B6); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">Welcome to NOMA!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">No Mask World</p>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p style="color: #333; font-size: 18px;">Hey <strong>@${username}</strong>! 👋</p>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Welcome to <strong>No Mask World</strong> - a place where real stories meet real connections. 
            We're excited to have you join our community!
          </p>
          <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #1a1a2e; margin: 0 0 15px;">Here's what you can do:</h3>
            <ul style="color: #555; margin: 0; padding-left: 20px; line-height: 2;">
              <li>Share your authentic thoughts and stories</li>
              <li>Connect with like-minded people</li>
              <li>Respond to daily prompts</li>
              <li>Join supportive conversations</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://nomaworld.co.ke'}/feed" style="display: inline-block; background: linear-gradient(135deg, #1ABC9C, #16a085); color: #fff; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Start Exploring</a>
          </div>
        </div>
        <div style="background: #f8f9fa; padding: 15px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">Questions? Reply to this email or contact us at support@nomaworld.co.ke</p>
          <p style="color: #999; font-size: 11px; margin: 10px 0 0;">� ${new Date().getFullYear()} NOMA - No Mask World | nomaworld.co.ke</p>
        </div>
      </div>
    `
  });
}

export async function sendAnnouncementEmail(to: string, title: string, content: string): Promise<void> {
  await sendEmail({
    to,
    subject: `📢 ${title}`,
    sender: 'info',
    senderName: 'NOMA Announcements',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1ABC9C, #9B59B6); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">📢 Announcement</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1a1a2e; margin: 0 0 20px;">${title}</h2>
          <div style="color: #555; font-size: 16px; line-height: 1.6;">
            ${content}
          </div>
        </div>
        <div style="background: #f8f9fa; padding: 15px; text-align: center;">
          <p style="color: #999; font-size: 11px; margin: 0;">� ${new Date().getFullYear()} NOMA - No Mask World | nomaworld.co.ke</p>
        </div>
      </div>
    `
  });
}

// ============================================
// SUPPORT EMAILS (support@nomaworld.co.ke)
// - Support ticket responses
// - Account issues
// - Report confirmations
// ============================================

export async function sendSupportEmail(to: string, subject: string, message: string): Promise<void> {
  await sendEmail({
    to,
    subject: `NOMA Support: ${subject}`,
    sender: 'support',
    senderName: 'NOMA Support',
    customReplyTo: EMAIL_ADDRESSES.support,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3498db, #2980b9); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">NOMA Support</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <div style="color: #555; font-size: 16px; line-height: 1.6;">
            ${message}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
          <p style="color: #666; font-size: 14px;">
            Need more help? Simply reply to this email and our support team will get back to you.
          </p>
        </div>
        <div style="background: #f8f9fa; padding: 15px; text-align: center;">
          <p style="color: #999; font-size: 11px; margin: 0;">� ${new Date().getFullYear()} NOMA - No Mask World | nomaworld.co.ke</p>
        </div>
      </div>
    `
  });
}

export async function sendReportConfirmationEmail(to: string, reportType: string): Promise<void> {
  await sendEmail({
    to,
    subject: 'Your report has been received',
    sender: 'support',
    senderName: 'NOMA Safety Team',
    customReplyTo: EMAIL_ADDRESSES.support,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3498db, #2980b9); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">Report Received</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p style="color: #333; font-size: 16px;">Thank you for helping keep NOMA safe.</p>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            We have received your report regarding <strong>${reportType}</strong>. 
            Our safety team will review it and take appropriate action.
          </p>
          <div style="background: #e8f4fd; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0;">
            <p style="color: #2980b9; margin: 0; font-size: 14px;">
              We take all reports seriously and will investigate within 24-48 hours.
            </p>
          </div>
          <p style="color: #666; font-size: 14px;">
            If you have additional information, please reply to this email.
          </p>
        </div>
        <div style="background: #f8f9fa; padding: 15px; text-align: center;">
          <p style="color: #999; font-size: 11px; margin: 0;">� ${new Date().getFullYear()} NOMA - No Mask World | nomaworld.co.ke</p>
        </div>
      </div>
    `
  });
}

export async function sendAccountWarningEmail(to: string, reason: string): Promise<void> {
  await sendEmail({
    to,
    subject: 'Important: Action required on your NOMA account',
    sender: 'support',
    senderName: 'NOMA Safety Team',
    customReplyTo: EMAIL_ADDRESSES.support,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0;">Account Notice</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p style="color: #333; font-size: 16px;">We've noticed activity on your account that requires attention.</p>
          <div style="background: #fef2f2; border-left: 4px solid #e74c3c; padding: 15px; margin: 20px 0;">
            <p style="color: #c0392b; margin: 0; font-size: 14px;">
              <strong>Reason:</strong> ${reason}
            </p>
          </div>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Please review our community guidelines to ensure your account remains in good standing.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you believe this is a mistake, please reply to this email to appeal.
          </p>
        </div>
        <div style="background: #f8f9fa; padding: 15px; text-align: center;">
          <p style="color: #999; font-size: 11px; margin: 0;">� ${new Date().getFullYear()} NOMA - No Mask World | nomaworld.co.ke</p>
        </div>
      </div>
    `
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getEmailConfig() {
  return {
    host: process.env.SMTP_HOST || 'smtp.nomaworld.co.ke',
    port: parseInt(process.env.SMTP_PORT || '587'),
    configured: isEmailConfigured(),
    emails: {
      noreply: EMAIL_ADDRESSES.noreply + ' (Verification, OTP, Password Reset)',
      info: EMAIL_ADDRESSES.info + ' (Welcome, Announcements)',
      support: EMAIL_ADDRESSES.support + ' (Support, Reports)'
    },
    replyTo: EMAIL_ADDRESSES.replyTo
  };
}

