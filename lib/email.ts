import nodemailer from 'nodemailer';

// Email addresses configuration
export const EMAIL_ADDRESSES = {
  info: process.env.SMTP_EMAIL_INFO || 'info@nomaworld.co.ke',
  support: process.env.SMTP_EMAIL_SUPPORT || 'support@nomaworld.co.ke',
  noreply: process.env.SMTP_EMAIL_NOREPLY || 'noreply@nomaworld.co.ke',
  default: process.env.SMTP_DEFAULT_SENDER || process.env.SMTP_EMAIL_INFO || 'info@nomaworld.co.ke'
};

// Email sender types
export type EmailSender = 'info' | 'support' | 'noreply';

// SMTP Configuration - all emails share the same server and password
const smtpConfig = {
  host: process.env.SMTP_HOST || 'mail.nomaworld.co.ke',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: EMAIL_ADDRESSES.default, // Use default email for authentication
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
};

// Create transporter
const transporter = nodemailer.createTransport(smtpConfig);

// Helper to create transporter with specific sender
function createTransporterWithSender(senderEmail: string) {
  return nodemailer.createTransport({
    ...smtpConfig,
    auth: {
      user: senderEmail,
      pass: process.env.SMTP_PASS
    }
  });
}

// Get sender email by type
function getSenderEmail(sender: EmailSender): string {
  return EMAIL_ADDRESSES[sender] || EMAIL_ADDRESSES.default;
}

// Get formatted "From" header
function getFromHeader(sender: EmailSender, name?: string): string {
  const email = getSenderEmail(sender);
  const displayName = name || 'NOMA - No Mask World';
  return `"${displayName}" <${email}>`;
}

// Verify connection on startup (optional, for debugging)
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('? SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('? SMTP connection failed:', error);
    return false;
  }
}

// Check if email is configured
function isEmailConfigured(): boolean {
  return !!(process.env.SMTP_PASS && process.env.SMTP_PASS !== 'your-shared-email-password-here');
}

// Send email with specified sender
async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  sender?: EmailSender;
  senderName?: string;
}): Promise<void> {
  const { to, subject, html, sender = 'info', senderName } = options;

  if (!isEmailConfigured()) {
    console.warn('?? SMTP_PASS not configured. Email not sent.');
    if (process.env.NODE_ENV === 'development') {
      console.log(`?? [DEV] Would send email to ${to} from ${getSenderEmail(sender)}`);
      console.log(`?? [DEV] Subject: ${subject}`);
      return;
    }
    throw new Error('Email service not configured');
  }

  const senderEmail = getSenderEmail(sender);
  const emailTransporter = createTransporterWithSender(senderEmail);

  const mailOptions = {
    from: getFromHeader(sender, senderName),
    to,
    subject,
    html
  };

  try {
    const info = await emailTransporter.sendMail(mailOptions);
    console.log(`? Email sent from ${senderEmail}:`, info.messageId);
  } catch (error: any) {
    console.error(`? Failed to send email from ${senderEmail}:`, error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export async function sendVerificationEmail(to: string, code: string): Promise<void> {
  if (!isEmailConfigured() && process.env.NODE_ENV === 'development') {
    console.log(`?? [DEV] Verification code for ${to}: ${code}`);
    return;
  }

  await sendEmail({
    to,
    subject: 'Verify your NOMA account',
    sender: 'noreply',
    senderName: 'NOMA Verification',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); padding: 2rem; text-align: center;">
          <div style="display: inline-block; width: 60px; height: 60px; background: #fff; border-radius: 16px; line-height: 60px; color: #1ABC9C; font-size: 1.75rem; font-weight: bold;">N</div>
          <h1 style="color: #fff; margin: 1rem 0 0; font-weight: 600;">Welcome to NOMA</h1>
        </div>
        <div style="padding: 2rem;">
          <p style="color: #4a5568; font-size: 1rem; line-height: 1.6; text-align: center;">
            Thank you for signing up! Use the verification code below to complete your registration:
          </p>
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 1.5rem; text-align: center; font-size: 2.5rem; letter-spacing: 0.75rem; font-weight: bold; color: #1ABC9C; border-radius: 12px; margin: 1.5rem 0; border: 2px dashed #1ABC9C;">
            ${code}
          </div>
          <p style="color: #6b7280; margin-top: 1rem; text-align: center; font-size: 0.9rem;">
            ? This code expires in <strong>10 minutes</strong>.
          </p>
          <p style="color: #9ca3af; text-align: center; font-size: 0.85rem;">
            If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
        <div style="background: #f8f9fa; padding: 1.5rem; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 0.8rem; margin: 0;">
            NOMA - No Mask World | Real Stories. Real Connections.<br />
            <a href="https://nomaworld.co.ke" style="color: #1ABC9C; text-decoration: none;">nomaworld.co.ke</a>
          </p>
        </div>
      </div>
    `
  });
}

export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  if (!isEmailConfigured() && process.env.NODE_ENV === 'development') {
    console.log(`?? [DEV] Password reset link for ${to}: ${resetLink}`);
    return;
  }

  await sendEmail({
    to,
    subject: 'Reset your NOMA password',
    sender: 'noreply',
    senderName: 'NOMA Security',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); padding: 2rem; text-align: center;">
          <div style="display: inline-block; width: 60px; height: 60px; background: #fff; border-radius: 16px; line-height: 60px; color: #1ABC9C; font-size: 1.75rem; font-weight: bold;">N</div>
          <h1 style="color: #fff; margin: 1rem 0 0; font-weight: 600;">Password Reset</h1>
        </div>
        <div style="padding: 2rem;">
          <p style="color: #4a5568; font-size: 1rem; line-height: 1.6; text-align: center;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          <div style="text-align: center; margin: 2rem 0;">
            <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #1ABC9C 0%, #16a085 100%); color: #fff; padding: 1rem 2.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 1rem; box-shadow: 0 4px 15px rgba(26, 188, 156, 0.3);">
              Reset Password
            </a>
          </div>
          <p style="color: #6b7280; margin-top: 1rem; text-align: center; font-size: 0.9rem;">
            ? This link expires in <strong>1 hour</strong>.
          </p>
          <p style="color: #9ca3af; text-align: center; font-size: 0.85rem;">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
        <div style="background: #f8f9fa; padding: 1.5rem; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 0.8rem; margin: 0;">
            NOMA - No Mask World | Real Stories. Real Connections.<br />
            <a href="https://nomaworld.co.ke" style="color: #1ABC9C; text-decoration: none;">nomaworld.co.ke</a>
          </p>
        </div>
      </div>
    `
  });
}

export async function sendOTPEmail(to: string, code: string): Promise<void> {
  if (!isEmailConfigured() && process.env.NODE_ENV === 'development') {
    console.log(`?? [DEV] OTP code for ${to}: ${code}`);
    return;
  }

  await sendEmail({
    to,
    subject: 'Your NOMA Login Code',
    sender: 'noreply',
    senderName: 'NOMA Security',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); padding: 2rem; text-align: center;">
          <div style="display: inline-block; width: 60px; height: 60px; background: #fff; border-radius: 16px; line-height: 60px; color: #1ABC9C; font-size: 1.75rem; font-weight: bold;">N</div>
          <h1 style="color: #fff; margin: 1rem 0 0; font-weight: 600;">Login Code</h1>
        </div>
        <div style="padding: 2rem;">
          <p style="color: #4a5568; font-size: 1rem; line-height: 1.6; text-align: center;">
            Use this code to log into your NOMA account:
          </p>
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 1.5rem; text-align: center; font-size: 2.5rem; letter-spacing: 0.75rem; font-weight: bold; color: #1ABC9C; border-radius: 12px; margin: 1.5rem 0; border: 2px dashed #1ABC9C;">
            ${code}
          </div>
          <p style="color: #6b7280; margin-top: 1rem; text-align: center; font-size: 0.9rem;">
            ? This code expires in <strong>10 minutes</strong>.
          </p>
          <p style="color: #9ca3af; text-align: center; font-size: 0.85rem;">
            If you didn't request this code, someone may be trying to access your account.
          </p>
        </div>
        <div style="background: #f8f9fa; padding: 1.5rem; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 0.8rem; margin: 0;">
            NOMA - No Mask World | Real Stories. Real Connections.<br />
            <a href="https://nomaworld.co.ke" style="color: #1ABC9C; text-decoration: none;">nomaworld.co.ke</a>
          </p>
        </div>
      </div>
    `
  });
}

export async function sendWelcomeEmail(to: string, username: string): Promise<void> {
  if (!isEmailConfigured() && process.env.NODE_ENV === 'development') {
    console.log(`?? [DEV] Welcome email for ${to}`);
    return;
  }

  await sendEmail({
    to,
    subject: 'Welcome to NOMA! ??',
    sender: 'info',
    senderName: 'NOMA Team',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); padding: 2rem; text-align: center;">
          <div style="display: inline-block; width: 60px; height: 60px; background: #fff; border-radius: 16px; line-height: 60px; color: #1ABC9C; font-size: 1.75rem; font-weight: bold;">N</div>
          <h1 style="color: #fff; margin: 1rem 0 0; font-weight: 600;">Welcome to NOMA!</h1>
        </div>
        <div style="padding: 2rem;">
          <p style="color: #4a5568; font-size: 1.1rem; line-height: 1.6;">
            Hey <strong>@${username}</strong>! ??
          </p>
          <p style="color: #4a5568; font-size: 1rem; line-height: 1.6;">
            Welcome to <strong>No Mask World</strong> - a place where real stories meet real connections. 
            We're excited to have you join our community!
          </p>
          <div style="background: #f8f9fa; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
            <h3 style="color: #1a1a2e; margin: 0 0 1rem;">Here's what you can do:</h3>
            <ul style="color: #4a5568; margin: 0; padding-left: 1.5rem; line-height: 2;">
              <li>Share your authentic thoughts and stories</li>
              <li>Connect with like-minded people</li>
              <li>Respond to daily prompts</li>
              <li>Join supportive conversations</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 2rem 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://nomaworld.co.ke'}/feed" style="display: inline-block; background: linear-gradient(135deg, #1ABC9C 0%, #16a085 100%); color: #fff; padding: 1rem 2.5rem; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 1rem;">
              Start Exploring
            </a>
          </div>
        </div>
        <div style="background: #f8f9fa; padding: 1.5rem; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 0.8rem; margin: 0;">
            Questions? Reply to this email or contact us at support@nomaworld.co.ke<br /><br />
            NOMA - No Mask World | Real Stories. Real Connections.<br />
            <a href="https://nomaworld.co.ke" style="color: #1ABC9C; text-decoration: none;">nomaworld.co.ke</a>
          </p>
        </div>
      </div>
    `
  });
}

export async function sendSupportEmail(to: string, subject: string, message: string): Promise<void> {
  if (!isEmailConfigured() && process.env.NODE_ENV === 'development') {
    console.log(`?? [DEV] Support email to ${to}: ${subject}`);
    return;
  }

  await sendEmail({
    to,
    subject,
    sender: 'support',
    senderName: 'NOMA Support',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); padding: 2rem; text-align: center;">
          <div style="display: inline-block; width: 60px; height: 60px; background: #fff; border-radius: 16px; line-height: 60px; color: #1ABC9C; font-size: 1.75rem; font-weight: bold;">N</div>
          <h1 style="color: #fff; margin: 1rem 0 0; font-weight: 600;">NOMA Support</h1>
        </div>
        <div style="padding: 2rem;">
          ${message}
        </div>
        <div style="background: #f8f9fa; padding: 1.5rem; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 0.8rem; margin: 0;">
            Need more help? Reply to this email.<br /><br />
            NOMA - No Mask World | Real Stories. Real Connections.<br />
            <a href="https://nomaworld.co.ke" style="color: #1ABC9C; text-decoration: none;">nomaworld.co.ke</a>
          </p>
        </div>
      </div>
    `
  });
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Export email configuration for testing
export function getEmailConfig() {
  return {
    host: smtpConfig.host,
    port: smtpConfig.port,
    emails: EMAIL_ADDRESSES,
    configured: isEmailConfigured()
  };
}

