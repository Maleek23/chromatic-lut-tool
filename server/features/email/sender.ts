import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendLutEmailParams {
  to: string;
  lutData: string;
  filename: string;
  format: string;
  gridSize: string;
}

export async function sendLutEmail({
  to,
  lutData,
  filename,
  format,
  gridSize,
}: SendLutEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Convert LUT data to base64 for attachment
    const lutBuffer = Buffer.from(lutData, 'utf-8');
    const base64Content = lutBuffer.toString('base64');

    const { data, error } = await resend.emails.send({
      from: 'CHROMA <noreply@updates.replit.app>',
      to: [to],
      subject: `Your LUT is ready: ${filename}`,
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
                        <h2 style="margin: 0 0 16px; color: #1a1a1a; font-size: 24px; font-weight: 600;">Your LUT is Ready!</h2>
                        <p style="margin: 0 0 24px; color: #666666; font-size: 16px; line-height: 1.5;">
                          Your generated LUT file is attached to this email and ready to use in your favorite color grading software.
                        </p>
                        
                        <!-- LUT Details Card -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; border: 1px solid #e9ecef; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 20px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;">Filename:</td>
                                  <td align="right" style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${filename}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;">Format:</td>
                                  <td align="right" style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${format}</td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #666666; font-size: 14px;">Grid Size:</td>
                                  <td align="right" style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${gridSize}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0 0 16px; color: #666666; font-size: 14px; line-height: 1.5;">
                          Need help installing your LUT? Check out our guides for:
                        </p>
                        <ul style="margin: 0 0 24px; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
                          <li>DaVinci Resolve</li>
                          <li>Adobe Premiere Pro</li>
                          <li>Final Cut Pro</li>
                          <li>Adobe Photoshop</li>
                        </ul>
                        
                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/install-luts" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                View Installation Guides
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                        <p style="margin: 0 0 8px; color: #999999; font-size: 12px; text-align: center;">
                          This email was sent because you generated a LUT on CHROMA.
                        </p>
                        <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                          © ${new Date().getFullYear()} CHROMA by UN/TITLD. All rights reserved.
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
      attachments: [
        {
          filename,
          content: base64Content,
        },
      ],
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error: error.message };
    }

    console.log('LUT email sent successfully:', data);
    return { success: true };
  } catch (error) {
    console.error('Failed to send LUT email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
