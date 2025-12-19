import nodemailer from 'nodemailer';

export type EmailSender = 'support' | 'admin' | 'info';

interface EmailConfig {
  from: string;
  replyTo?: string;
}

const emailConfigs: Record<EmailSender, EmailConfig> = {
  support: {
    from: 'support@nomaworld.co.ke',
    replyTo: 'support@nomaworld.co.ke'
  },
  admin: {
    from: 'admin@nomaworld.co.ke',
    replyTo: 'support@nomaworld.co.ke'
  },
  info: {
    from: 'info@nomaworld.co.ke',
    replyTo: 'support@nomaworld.co.ke'
  }
};

const createTransporter = (sender: EmailSender) => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: emailConfigs[sender].from,
      pass: process.env.SMTP_PASS
    }
  });
};

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  sender: EmailSender;
}

export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, html, text, sender } = options;
  const config = emailConfigs[sender];
  const transporter = createTransporter(sender);

  try {
    const info = await transporter.sendMail({
      from: `"NOMA" <${config.from}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
      replyTo: config.replyTo
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

export async function sendRegistrationEmail(email: string, confirmationUrl: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Email - NOMA</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #ffbe0b 0%, #2B5A8E 100%); padding: 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800;">NOMA</h1>
                  <p style="margin: 10px 0 0; color: #E8F4FF; font-size: 14px; font-weight: 500;">No Mask Relationships</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 50px 40px;">
                  <h2 style="margin: 0 0 20px; color: #ffbe0b; font-size: 24px; font-weight: 700;">Welcome to NOMA!</h2>
                  <p style="margin: 0 0 20px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                    Thank you for creating your account. We're excited to help you on your journey toward honest clarity in your relationships.
                  </p>
                  <p style="margin: 0 0 30px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                    Please confirm your email address by clicking the button below:
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center">
                        <a href="${confirmationUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF6B6B 0%, #E55A5A 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);">
                          Confirm Email Address
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin: 30px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                    If you didn't create an account with NOMA, you can safely ignore this email.
                  </p>
                  <p style="margin: 20px 0 0; color: #718096; font-size: 13px; line-height: 1.6;">
                    If the button doesn't work, copy and paste this link into your browser:<br/>
                    <a href="${confirmationUrl}" style="color: #ffbe0b; word-break: break-all;">${confirmationUrl}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #F7FAFC; padding: 30px 40px; border-top: 1px solid #E2E8F0;">
                  <p style="margin: 0 0 10px; color: #4A5568; font-size: 14px; font-weight: 600;">Need Help?</p>
                  <p style="margin: 0; color: #718096; font-size: 13px; line-height: 1.6;">
                    Contact us at <a href="mailto:support@nomaworld.co.ke" style="color: #ffbe0b; text-decoration: none;">support@nomaworld.co.ke</a><br/>
                    📞 0701066845 | 0702794172
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #ffbe0b;">
                  <p style="margin: 0; color: #94C5E8; font-size: 12px;">
                    © 2025 NOMA - No Mask Relationships. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Confirm Your Email - NOMA',
    html,
    sender: 'support'
  });
}

export async function sendPackagePurchaseEmail(email: string, packageName: string, amount: number) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Package Purchase - NOMA</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #ffbe0b 0%, #2B5A8E 100%); padding: 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800;">NOMA</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 50px 40px;">
                  <h2 style="margin: 0 0 20px; color: #ffbe0b; font-size: 24px; font-weight: 700;">Package Information</h2>
                  <p style="margin: 0 0 20px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                    Thank you for your interest in <strong>${packageName}</strong>.
                  </p>
                  <table width="100%" cellpadding="12" style="background-color: #F7FAFC; border-radius: 8px; margin: 30px 0;">
                    <tr>
                      <td style="color: #718096; font-size: 14px;">Package:</td>
                      <td style="color: #ffbe0b; font-size: 14px; font-weight: 600; text-align: right;">${packageName}</td>
                    </tr>
                    <tr>
                      <td style="color: #718096; font-size: 14px;">Amount:</td>
                      <td style="color: #ffbe0b; font-size: 14px; font-weight: 600; text-align: right;">KES ${amount.toLocaleString()}</td>
                    </tr>
                  </table>
                  <p style="margin: 30px 0 0; color: #4A5568; font-size: 14px; line-height: 1.6;">
                    For questions about this package, contact us at <a href="mailto:support@nomaworld.co.ke" style="color: #ffbe0b;">support@nomaworld.co.ke</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #ffbe0b;">
                  <p style="margin: 0; color: #94C5E8; font-size: 12px;">© 2025 NOMA. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: `Package Confirmation - ${packageName}`,
    html,
    sender: 'support'
  });
}

export async function sendPaymentSuccessEmail(email: string, orderDetails: { packageName: string; amount: number; orderId: string }) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Successful - NOMA</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px; text-align: center;">
                  <div style="width: 64px; height: 64px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 32px;">✓</span>
                  </div>
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800;">Payment Successful!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 50px 40px;">
                  <p style="margin: 0 0 30px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                    Your payment has been processed successfully. You now have access to your package.
                  </p>
                  <table width="100%" cellpadding="12" style="background-color: #F7FAFC; border-radius: 8px; margin: 30px 0;">
                    <tr>
                      <td style="color: #718096; font-size: 14px;">Order ID:</td>
                      <td style="color: #ffbe0b; font-size: 14px; font-weight: 600; text-align: right;">${orderDetails.orderId}</td>
                    </tr>
                    <tr>
                      <td style="color: #718096; font-size: 14px;">Package:</td>
                      <td style="color: #ffbe0b; font-size: 14px; font-weight: 600; text-align: right;">${orderDetails.packageName}</td>
                    </tr>
                    <tr>
                      <td style="color: #718096; font-size: 14px;">Amount Paid:</td>
                      <td style="color: #10B981; font-size: 16px; font-weight: 700; text-align: right;">KES ${orderDetails.amount.toLocaleString()}</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                    <tr>
                      <td align="center">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #ffbe0b 0%, #2B5A8E 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 50px; font-weight: 700; font-size: 16px;">
                          Go to Dashboard
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #ffbe0b;">
                  <p style="margin: 0; color: #94C5E8; font-size: 12px;">© 2025 NOMA. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Payment Successful - NOMA',
    html,
    sender: 'admin'
  });
}

export async function sendAssessmentResultsEmail(email: string, resultUrl: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Assessment Results - NOMA</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #ffbe0b 0%, #2B5A8E 100%); padding: 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800;">NOMA</h1>
                  <p style="margin: 10px 0 0; color: #E8F4FF; font-size: 14px;">Your Assessment Results Are Ready</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 50px 40px;">
                  <h2 style="margin: 0 0 20px; color: #ffbe0b; font-size: 24px; font-weight: 700;">Your Results Are Ready</h2>
                  <p style="margin: 0 0 20px; color: #4A5568; font-size: 16px; line-height: 1.6;">
                    Thank you for completing your NOMA assessment. Your personalized results and recommendations are now available.
                  </p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding: 30px 0;">
                        <a href="${resultUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF6B6B 0%, #E55A5A 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 50px; font-weight: 700; font-size: 16px;">
                          View Your Results
                        </a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin: 30px 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                    Remember, NOMA provides guidance and clarity. For professional therapeutic support, please consult a licensed therapist.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #ffbe0b;">
                  <p style="margin: 0; color: #94C5E8; font-size: 12px;">© 2025 NOMA. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Your NOMA Assessment Results',
    html,
    sender: 'info'
  });
}
