import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Account Information</h3>
                <p className="text-muted-foreground">
                  When you create an account, we collect your email address and password (stored securely with bcrypt hashing).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Usage Data</h3>
                <p className="text-muted-foreground">
                  We track your monthly LUT generation count to enforce tier limits. We do not track individual image uploads or generated LUT content.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <p className="text-muted-foreground">
                  Payment processing is handled securely by Stripe. We never store your credit card information on our servers.
                  Stripe collects billing information according to their{' '}
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and maintain the CHROMA service</li>
                <li>Process LUT generation requests and deliver results via email</li>
                <li>Manage your account and subscription tier</li>
                <li>Enforce usage limits and billing</li>
                <li>Send service-related emails (LUT delivery, account notifications)</li>
                <li>Improve our color science algorithms and features</li>
              </ul>
              
              <p className="text-muted-foreground mt-4">
                <strong>We do NOT:</strong> Sell your data, use your uploaded images for marketing, or share your information with third parties except as required for service operation (Stripe for payments, Resend for email delivery).
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>3. Data Storage and Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Passwords are hashed using bcrypt before storage</li>
                  <li>All connections use HTTPS/TLS encryption</li>
                  <li>Database hosted securely with Neon (PostgreSQL)</li>
                  <li>Session management with secure, HTTP-only cookies</li>
                  <li>CSRF protection on all forms</li>
                  <li>Rate limiting to prevent abuse</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 mt-4">Data Retention</h3>
                <p className="text-muted-foreground">
                  Uploaded images are processed in-memory and deleted immediately after LUT generation.
                  We store only the generated LUTs you choose to save (up to your tier limit). Account data
                  is retained until you delete your account.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>4. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and all associated data</li>
                <li>Export your saved LUTs</li>
                <li>Opt out of marketing emails (service emails are required)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@untitld.co" className="text-primary hover:underline">
                  privacy@untitld.co
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>5. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                We use essential cookies for session management (authentication) only.
                We do not use advertising cookies or third-party analytics trackers.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>6. Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Stripe (Payment Processing)</h3>
                <p className="text-muted-foreground">
                  Handles all payment transactions. Subject to{' '}
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Stripe's Privacy Policy
                  </a>.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Resend (Email Delivery)</h3>
                <p className="text-muted-foreground">
                  Delivers generated LUT files to your email. Subject to{' '}
                  <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Resend's Privacy Policy
                  </a>.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Neon (Database Hosting)</h3>
                <p className="text-muted-foreground">
                  PostgreSQL database hosting. Subject to{' '}
                  <a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Neon's Privacy Policy
                  </a>.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>7. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                CHROMA is not intended for users under 13 years of age. We do not knowingly collect
                personal information from children under 13.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <ul className="mt-4 space-y-2">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@untitld.co" className="text-primary hover:underline">
                    privacy@untitld.co
                  </a>
                </li>
                <li><strong>Company:</strong> UN/TITLD</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
  );
}
