import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                By accessing or using CHROMA ("the Service"), you agree to be bound by these Terms of Service.
                If you do not agree to these terms, do not use the Service.
              </p>
              <p>
                CHROMA is operated by UN/TITLD. By using our Service, you also agree to our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>2. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                CHROMA provides professional LUT (Look-Up Table) generation, conversion, analysis, and optimization tools
                for cinematographers, colorists, and content creators. We use cinema-grade color science to extract authentic
                color grading from reference images.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>3. User Accounts and Tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Account Registration</h3>
                <p className="text-muted-foreground">
                  You must provide a valid email address and create a secure password. You are responsible for
                  maintaining the confidentiality of your account credentials.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Subscription Tiers</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Free:</strong> 3 Image-to-LUT generations per month, then $2.50 per additional LUT</li>
                  <li><strong>Creator ($7/mo):</strong> Unlimited generations, 3 output formats, up to 33³ grid size</li>
                  <li><strong>Pro ($12/mo or $99/yr):</strong> All features, 6 formats, 65³ grid, Analyzer/Optimizer tools</li>
                  <li><strong>Studio ($25/mo):</strong> Team features, custom branding (coming soon)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Limits</h3>
                <p className="text-muted-foreground">
                  Usage limits reset on the 1st of each month. LUT conversion is unlimited for all tiers within format restrictions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>4. Payment and Billing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Subscription Billing</h3>
                <p className="text-muted-foreground">
                  Paid subscriptions are billed monthly or annually through Stripe. Subscriptions automatically renew
                  unless canceled before the renewal date.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pay-Per-Use (Free Tier)</h3>
                <p className="text-muted-foreground">
                  After using your 3 free monthly generations, additional LUTs cost $2.50 each. Charges are processed
                  immediately via Stripe.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Refunds</h3>
                <p className="text-muted-foreground">
                  Subscription fees are non-refundable. You may cancel your subscription at any time to prevent future charges.
                  Your access continues until the end of your paid period.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>5. Acceptable Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Upload illegal, copyrighted, or inappropriate content</li>
                <li>Attempt to reverse-engineer our color science algorithms</li>
                <li>Use the Service to harm, harass, or impersonate others</li>
                <li>Circumvent usage limits or payment requirements</li>
                <li>Overload our servers with excessive automated requests</li>
                <li>Share account credentials or resell access to the Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Your Content</h3>
                <p className="text-muted-foreground">
                  You retain all rights to images you upload and LUTs you generate. We do not claim ownership of your content.
                  Uploaded images are processed in-memory and deleted immediately after LUT generation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Our Technology</h3>
                <p className="text-muted-foreground">
                  CHROMA's color science algorithms, software, and branding are proprietary to UN/TITLD. You may not copy,
                  modify, or redistribute our technology.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Generated LUTs</h3>
                <p className="text-muted-foreground">
                  LUTs you generate are yours to use commercially without attribution. However, you may not claim to have
                  developed CHROMA's color science technology.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>7. Service Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service may be temporarily
                unavailable due to maintenance, updates, or technical issues. We are not liable for any losses resulting
                from service interruptions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>8. Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                CHROMA is provided "AS IS" without warranties of any kind. While we implement professional color science
                standards, we do not guarantee that generated LUTs will meet your specific requirements or be error-free.
              </p>
              <p className="mt-4">
                You are responsible for testing LUTs in your workflow before using them in production. We recommend saving
                backups of important projects.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                UN/TITLD shall not be liable for any indirect, incidental, special, or consequential damages arising from
                your use of CHROMA, including but not limited to loss of profits, data, or business opportunities.
              </p>
              <p className="mt-4">
                Our total liability to you for any claim shall not exceed the amount you paid us in the 12 months preceding
                the claim.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>10. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">By You</h3>
                <p className="text-muted-foreground">
                  You may cancel your subscription or delete your account at any time. Your access continues until the end
                  of your paid period.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">By Us</h3>
                <p className="text-muted-foreground">
                  We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent
                  activity, or abuse the Service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>11. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                We may update these Terms from time to time. Continued use of the Service after changes constitutes
                acceptance of the new Terms. We will notify you of significant changes via email.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>12. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>For questions about these Terms, please contact us:</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:legal@untitld.co" className="text-primary hover:underline">
                    legal@untitld.co
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
