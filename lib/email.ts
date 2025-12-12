import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.unvoxia.co.ke',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'info@unvoxia.co.ke',
    pass: process.env.SMTP_PASS
  }
});

export async function sendVerificationEmail(to: string, code: string) {
  const mailOptions = {
    from: '"Unvoxia" <info@unvoxia.co.ke>',
    to,
    subject: 'Verify your Unvoxia account',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1ABC9C;">Welcome to Unvoxia</h2>
        <p>Your verification code is:</p>
        <div style="background: #f5f5f5; padding: 1rem; text-align: center; font-size: 2rem; letter-spacing: 0.5rem; font-weight: bold; color: #2C3E50;">
          ${code}
        </div>
        <p style="color: #888; margin-top: 1rem;">This code expires in 10 minutes.</p>
        <p style="color: #888;">If you did not request this, please ignore this email.</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const mailOptions = {
    from: '"Unvoxia" <info@unvoxia.co.ke>',
    to,
    subject: 'Reset your Unvoxia password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1ABC9C;">Password Reset</h2>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; background: #1ABC9C; color: #fff; padding: 0.75rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Reset Password
        </a>
        <p style="color: #888; margin-top: 1rem;">This link expires in 1 hour.</p>
        <p style="color: #888;">If you did not request this, please ignore this email.</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
