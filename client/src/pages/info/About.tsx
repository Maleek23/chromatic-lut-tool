import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Target, Users, Zap } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      <div className="container mx-auto px-4 py-20 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3">CHROMA</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional color science tools for cinematographers and colorists, by UN/TITLD
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission */}
          <Card className="hover-elevate border-primary/30 bg-background/80 backdrop-blur-sm transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                CHROMA exists to democratize professional color grading. We believe cinema-grade color science shouldn't
                be locked behind expensive software or require years of training.
              </p>
              <p>
                By combining industry-standard color science techniques with modern web technology, we make professional 
                LUT generation accessible to everyone—from hobbyists testing their first color grade to Hollywood colorists 
                working on feature films.
              </p>
            </CardContent>
          </Card>

          {/* Technology */}
          <Card className="hover-elevate border-chart-2/30 bg-background/80 backdrop-blur-sm transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20">
                  <Sparkles className="w-6 h-6 text-chart-2" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Professional Color Science</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                CHROMA implements cinema-grade color science verified against VES Technology Committee standards and
                CIE (International Commission on Illumination) specifications.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Perceptual Accuracy</h3>
                  <p className="text-sm">
                    Industry-standard perceptual color space ensures transformations match human vision,
                    not just mathematical RGB manipulation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Intelligent Sampling</h3>
                  <p className="text-sm">
                    Multi-cluster analysis extracts dominant colors and comprehensive coverage from
                    reference images for authentic color mapping.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Cinema-Quality Tonality</h3>
                  <p className="text-sm">
                    Cinema-grade tone curves create professional highlight rolloff
                    and shadow detail preservation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Production Ready</h3>
                  <p className="text-sm">
                    Hue-preserving gamut compression and skin tone protection ensure
                    compatibility with all professional color grading software.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="hover-elevate border-chart-3/30 bg-background/80 backdrop-blur-sm transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20">
                  <Users className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">By UN/TITLD</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                UN/TITLD is a creative technology studio focused on building professional tools for creators.
                We combine deep technical expertise with an obsessive attention to craft.
              </p>
              <p>
                CHROMA represents our commitment to elevating the standard of color grading tools. Every feature
                is designed with professionals in mind, then made accessible enough for anyone to use.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Our Values</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Quality Over Hype</h3>
                  <p className="text-sm text-muted-foreground">
                    We don't use buzzwords or marketing spin. Our color science is verified against industry
                    standards. Our LUTs work in professional workflows. That's the promise.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional tools shouldn't require a manual. CHROMA's interface is designed to be
                    intuitive for beginners while offering depth for experts.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    We document our color science pipeline in detail. We explain what each tier includes.
                    No hidden fees, no confusing pricing.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Privacy First</h3>
                  <p className="text-sm text-muted-foreground">
                    Your uploaded images are processed in-memory and deleted immediately. We don't use your
                    work for marketing. We don't sell your data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Have questions? Need support? Want to share your work?
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Support:</strong>{' '}
                  <a href="mailto:support@untitld.co" className="text-primary hover:underline">
                    support@untitld.co
                  </a>
                </li>
                <li>
                  <strong>Business Inquiries:</strong>{' '}
                  <a href="mailto:hello@untitld.co" className="text-primary hover:underline">
                    hello@untitld.co
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
