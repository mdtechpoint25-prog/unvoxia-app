import nodemailer from 'nodemailer';

// SMTP Configuration with better error handling
const smtpConfig = {
  host: process.env.SMTP_HOST || 'mail.nomaworld.co.ke',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'info@nomaworld.co.ke',
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false // Allow self-signed certificates
  }
};

// Create transporter
const transporter = nodemailer.createTransport(smtpConfig);

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

export async function sendVerificationEmail(to: string, code: string): Promise<void> {
  // Check if SMTP password is configured
  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your-email-password-here') {
    console.warn('?? SMTP_PASS not configured. Email not sent. OTP code:', code);
    // In development, just log the code instead of failing
    if (process.env.NODE_ENV === 'development') {
      console.log(`?? [DEV] Verification code for ${to}: ${code}`);
      return;
    }
    throw new Error('Email service not configured');
  }

  const mailOptions = {
    from: `"NOMA - No Mask World" <${process.env.SMTP_USER || 'info@nomaworld.co.ke'}>`,
    to,
    subject: 'Verify your NOMA account',
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
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('? Verification email sent:', info.messageId);
  } catch (error: any) {
    console.error('? Failed to send verification email:', error.message);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}

export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  // Check if SMTP password is configured
  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your-email-password-here') {
    console.warn('?? SMTP_PASS not configured. Password reset email not sent.');
    if (process.env.NODE_ENV === 'development') {
      console.log(`?? [DEV] Password reset link for ${to}: ${resetLink}`);
      return;
    }
    throw new Error('Email service not configured');
  }

  const mailOptions = {
    from: `"NOMA - No Mask World" <${process.env.SMTP_USER || 'info@nomaworld.co.ke'}>`,
    to,
    subject: 'Reset your NOMA password',
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
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('? Password reset email sent:', info.messageId);
  } catch (error: any) {
    console.error('? Failed to send password reset email:', error.message);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}

export async function sendOTPEmail(to: string, code: string): Promise<void> {
  // Check if SMTP password is configured
  if (!process.env.SMTP_PASS || process.env.SMTP_PASS === 'your-email-password-here') {
    console.warn('?? SMTP_PASS not configured. OTP email not sent.');
    if (process.env.NODE_ENV === 'development') {
      console.log(`?? [DEV] OTP code for ${to}: ${code}`);
      return;
    }
    throw new Error('Email service not configured');
  }

  const mailOptions = {
    from: `"NOMA - No Mask World" <${process.env.SMTP_USER || 'info@nomaworld.co.ke'}>`,
    to,
    subject: 'Your NOMA Login Code',
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
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('? OTP email sent:', info.messageId);
  } catch (error: any) {
    console.error('? Failed to send OTP email:', error.message);
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

