import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.nomaworld.co.ke',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'info@nomaworld.co.ke',
    pass: process.env.SMTP_PASS
  }
});

export async function sendVerificationEmail(to: string, code: string) {
  const mailOptions = {
    from: '"No Mask World" <info@nomaworld.co.ke>',
    to,
    subject: 'Verify your NOMA account',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="display: inline-block; width: 50px; height: 50px; background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); border-radius: 12px; line-height: 50px; color: #fff; font-size: 1.5rem; font-weight: bold;">N</div>
        </div>
        <h2 style="color: #1ABC9C; text-align: center;">Welcome to No Mask World</h2>
        <p style="text-align: center;">Your verification code is:</p>
        <div style="background: #f5f5f5; padding: 1.5rem; text-align: center; font-size: 2.5rem; letter-spacing: 0.5rem; font-weight: bold; color: #2C3E50; border-radius: 12px; margin: 1rem 0;">
          ${code}
        </div>
        <p style="color: #888; margin-top: 1rem; text-align: center;">This code expires in 10 minutes.</p>
        <p style="color: #888; text-align: center;">If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 2rem 0;" />
        <p style="color: #aaa; font-size: 0.85rem; text-align: center;">
          No Mask World (NOMA) - Real Work. Real Results.<br />
          nomaworld.co.ke
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const mailOptions = {
    from: '"No Mask World" <info@nomaworld.co.ke>',
    to,
    subject: 'Reset your NOMA password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="display: inline-block; width: 50px; height: 50px; background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); border-radius: 12px; line-height: 50px; color: #fff; font-size: 1.5rem; font-weight: bold;">N</div>
        </div>
        <h2 style="color: #1ABC9C; text-align: center;">Password Reset</h2>
        <p style="text-align: center;">Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 2rem 0;">
          <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%); color: #fff; padding: 0.85rem 2.5rem; border-radius: 10px; text-decoration: none; font-weight: 600;">
            Reset Password
          </a>
        </div>
        <p style="color: #888; margin-top: 1rem; text-align: center;">This link expires in 1 hour.</p>
        <p style="color: #888; text-align: center;">If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 2rem 0;" />
        <p style="color: #aaa; font-size: 0.85rem; text-align: center;">
          No Mask World (NOMA) - Real Work. Real Results.<br />
          nomaworld.co.ke
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

