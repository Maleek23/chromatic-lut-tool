import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, MessageCircle, Book, HelpCircle, ExternalLink, Clock, Shield, Zap } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function Support() {
  useEffect(() => {
    document.title = "Support - CHROMA by UN/TITLD | Help & Contact";
    
    const metaTags = [
      { name: "description", content: "Get help with CHROMA. Contact support, browse documentation, and find answers to common questions about LUT generation, format conversion, and color grading tools." },
      { property: "og:title", content: "Support - CHROMA by UN/TITLD" },
      { property: "og:description", content: "Need help? Contact our support team or browse our comprehensive documentation and resources." },
      { property: "og:type", content: "website" },
      { name: "keywords", content: "CHROMA support, LUT help, color grading support, contact, customer service, documentation" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    return () => {
      document.title = "CHROMA by UN/TITLD";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="outline" data-testid="badge-support">
              <HelpCircle className="w-3 h-3 mr-1" />
              Support Center
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              How can we help?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get support, browse documentation, or contact our team
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Support */}
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      24-48h response
                    </Badge>
                  </div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Send us a detailed message about your issue</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For technical issues, feature requests, or general inquiries
                  </p>
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-primary to-chart-2"
                    data-testid="button-email-support"
                  >
                    <a href="mailto:hello@untitld.co">
                      <Mail className="w-4 h-4 mr-2" />
                      Email hello@untitld.co
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Documentation */}
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                      <Book className="w-6 h-6 text-chart-2" />
                    </div>
                    <Badge variant="secondary">
                      <Zap className="w-3 h-3 mr-1" />
                      Instant answers
                    </Badge>
                  </div>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Browse our comprehensive guides and resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn about LUT formats, installation, and color science
                  </p>
                  <Button 
                    asChild 
                    variant="outline"
                    className="w-full"
                    data-testid="button-documentation"
                  >
                    <a href="/resources">
                      <Book className="w-4 h-4 mr-2" />
                      View Documentation
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-4">
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">What file formats do you support?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-2">CHROMA supports all major LUT formats:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>.cube</strong> - Industry standard 3D LUT (all tiers)</li>
                    <li><strong>.3dl</strong> - Professional 3D LUT for Avid, Adobe, DaVinci (Creator+)</li>
                    <li><strong>.look</strong> - Autodesk/Nuke format for VFX (Creator+)</li>
                    <li><strong>.lut</strong> - Simple 1D LUT (Pro+)</li>
                    <li><strong>.xmp</strong> - Adobe Lightroom presets (Pro+)</li>
                  </ul>
                  <Button asChild variant="ghost" className="mt-2 p-0 h-auto text-primary" data-testid="link-lut-formats">
                    <a href="/resources/lut-formats">
                      Learn more about LUT formats <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">How does the Image-to-LUT generator work?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    Our professional color science pipeline analyzes your reference image using CIE L*a*b* perceptual color space, 
                    k-means clustering, and filmic tone curves to extract cinema-quality color grades. The process is verified against 
                    VES and CIE industry standards.
                  </p>
                  <Button asChild variant="ghost" className="mt-2 p-0 h-auto text-primary" data-testid="link-color-science">
                    <a href="/color-science">
                      Read about our color science <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">What's the difference between Free and paid tiers?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-2"><strong>Free:</strong> 3 monthly Image-to-LUT generations (25MB limit), then $2.50 per use. .cube format only.</p>
                  <p className="mb-2"><strong>Creator ($7/mo):</strong> Unlimited generations, 50MB limit, .cube/.3dl/.look formats.</p>
                  <p className="mb-2"><strong>Pro ($12/mo):</strong> All tools, 100MB limit, all formats including .lut and .xmp.</p>
                  <p><strong>Studio ($25/mo):</strong> Team features, 200MB limit, priority support.</p>
                  <Button asChild variant="ghost" className="mt-2 p-0 h-auto text-primary" data-testid="link-pricing">
                    <a href="/upgrade">
                      View full pricing comparison <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">How do I install LUTs in my editing software?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    We have step-by-step guides for installing LUTs in DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro, 
                    and other popular editing applications.
                  </p>
                  <Button asChild variant="ghost" className="mt-2 p-0 h-auto text-primary" data-testid="link-install-luts">
                    <a href="/resources/install-luts">
                      View installation guides <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Can I cancel my subscription anytime?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    Yes, you can cancel your subscription at any time from your account settings. You'll continue to have 
                    access to your paid features until the end of your current billing period, then automatically revert 
                    to the Free tier.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">Is my payment information secure?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    Absolutely. We use Stripe for all payment processing. We never see or store your credit card information. 
                    All transactions are encrypted with industry-standard SSL/TLS protocols.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs">PCI DSS compliant payment processing</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">I forgot my password. How do I reset it?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    Click the "Forgot password?" link on the login page, enter your email, and we'll send you a secure 
                    password reset link. The link expires after 1 hour for security.
                  </p>
                  <Button asChild variant="ghost" className="mt-2 p-0 h-auto text-primary" data-testid="link-forgot-password">
                    <a href="/forgot-password">
                      Reset password now <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      {/* Still Need Help */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-primary to-chart-2"
              data-testid="button-contact-support"
            >
              <a href="mailto:hello@untitld.co">
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Average response time: 24-48 hours
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
