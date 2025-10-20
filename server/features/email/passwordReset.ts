import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendPasswordResetEmailParams {
  to: string;
  resetToken: string;
  userName?: string;
}

export async function sendPasswordResetEmail({
  to,
  resetToken,
  userName,
}: SendPasswordResetEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const resetUrl = `${process.env.REPLIT_DOMAINS?.split(',')[0] || 'http://localhost:5000'}/reset-password?token=${resetToken}`;
    
    const { data, error } = await resend.emails.send({
      from: 'CHROMA <noreply@updates.replit.app>',
      to: [to],
      subject: 'Reset Your CHROMA Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">CHROMA</h1>
                        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Professional LUT Tools</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                        ${userName ? `<p style="margin: 0 0 16px; color: #666666; font-size: 16px;">Hi ${userName},</p>` : ''}
                        <p style="margin: 0 0 24px; color: #666666; font-size: 16px; line-height: 1.5;">
                          We received a request to reset your password for your CHROMA account. Click the button below to create a new password.
                        </p>
                        
                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                          <tr>
                            <td align="center">
                              <a href="${resetUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                                Reset Password
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Alternative Link -->
                        <p style="margin: 24px 0 0; color: #999999; font-size: 14px; line-height: 1.5;">
                          Or copy and paste this link into your browser:<br/>
                          <a href="${resetUrl}" style="color: #667eea; text-decoration: none; word-break: break-all;">${resetUrl}</a>
                        </p>
                        
                        <!-- Security Notice -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0 0; padding: 20px; background-color: #fff8f0; border-left: 4px solid #ff9800; border-radius: 4px;">
                          <tr>
                            <td>
                              <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                <strong style="color: #333333;">Security Notice:</strong><br/>
                                • This link expires in <strong>1 hour</strong><br/>
                                • If you didn't request this, you can safely ignore this email<br/>
                                • Your password won't change until you create a new one
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 32px; border-top: 1px solid #eeeeee; text-align: center;">
                        <p style="margin: 0 0 8px; color: #999999; font-size: 13px;">
                          Need help? Contact us at <a href="mailto:support@chroma.com" style="color: #667eea; text-decoration: none;">support@chroma.com</a>
                        </p>
                        <p style="margin: 0; color: #cccccc; font-size: 12px;">
                          © 2025 CHROMA by UN/TITLD. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send password reset email:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
