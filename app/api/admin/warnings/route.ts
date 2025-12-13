import { NextResponse } from 'next/server';
import { query } from '@/lib/turso';
import { getAdminFromSession } from '@/lib/admin';
import nodemailer from 'nodemailer';

// Email configuration (reuse from lib/email.ts pattern)
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
};

async function sendWarningEmail(to: string, username: string, reason: string, severity: string, message?: string) {
  if (!EMAIL_CONFIG.auth.pass) {
    console.warn('⚠️ SMTP not configured, skipping email');
    return;
  }

  const transporter = nodemailer.createTransport(EMAIL_CONFIG);
  
  const emailSubject = severity === 'severe' 
    ? '⚠️ Important: Community Guidelines Violation' 
    : '📋 NOMA Community Guidelines Reminder';

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: ${severity === 'severe' ? '#e74c3c' : '#f39c12'}; padding: 30px; text-align: center;">
        <h1 style="color: #fff; margin: 0;">${severity === 'severe' ? '⚠️' : '📋'} Community Notice</h1>
      </div>
      <div style="padding: 30px; background: #fff;">
        <p style="color: #333; font-size: 16px;">Hello <strong>@${username}</strong>,</p>
        
        <p style="color: #555; line-height: 1.6;">
          This is ${severity === 'severe' ? 'an important notice' : 'a friendly reminder'} regarding your activity on NOMA.
        </p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px; color: #333; font-weight: 600;">Reason:</p>
          <p style="margin: 0; color: #555;">${reason}</p>
          ${message ? `
            <p style="margin: 20px 0 10px; color: #333; font-weight: 600;">Additional Details:</p>
            <p style="margin: 0; color: #555;">${message}</p>
          ` : ''}
        </div>

        <p style="color: #555; line-height: 1.6;">
          ${severity === 'severe' 
            ? 'Please review our community guidelines and adjust your behavior accordingly. Continued violations may result in account restrictions.'
            : 'We encourage you to review our community guidelines to ensure a positive experience for everyone on NOMA.'}
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://nomaworld.co.ke/terms" 
             style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #1ABC9C 0%, #16a085 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Review Guidelines
          </a>
        </div>

        <p style="color: #999; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          This is an automated message from the NOMA moderation team. If you have questions, please contact support@nomaworld.co.ke
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"NOMA Support" <support@nomaworld.co.ke>`,
      to,
      subject: emailSubject,
      html: emailContent,
      replyTo: 'support@nomaworld.co.ke'
    });
    console.log(`📤 Warning email sent to ${to}`);
  } catch (error) {
    console.error('Email send error:', error);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromSession();
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { userId, reason, severity, message } = await request.json();

    if (!userId || !reason || !severity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get user details
    const user = await query('SELECT email, username FROM users WHERE id = ?', [userId]);
    if (!user || user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { email, username } = user[0];

    // Create warning record
    const warningId = `warn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Send warning email
    await sendWarningEmail(email, username, reason, severity, message);

    return NextResponse.json({ 
      success: true, 
      message: 'Warning sent successfully',
      warningId 
    });
  } catch (error) {
    console.error('Admin warning error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
