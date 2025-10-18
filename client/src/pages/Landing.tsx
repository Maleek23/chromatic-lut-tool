import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, BarChart3, Download, Check, Pipette } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Clean Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/5" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h1 className="text-7xl font-bold tracking-tight mb-2">
              CHROMATIC
            </h1>
            <div className="flex items-center justify-center gap-0 text-sm font-medium text-muted-foreground group cursor-default mb-4">
              <span className="transition-all duration-700 ease-in-out group-hover:translate-x-4 group-hover:opacity-0 group-hover:scale-0">by UN</span>
              <span className="text-primary mx-1 text-lg transition-all duration-700 ease-in-out group-hover:scale-200 group-hover:rotate-[360deg] group-hover:drop-shadow-[0_0_20px_rgba(var(--primary),0.8)]">/</span>
              <span className="transition-all duration-700 ease-in-out group-hover:-translate-x-4 group-hover:opacity-0 group-hover:scale-0">TITLD</span>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Analyze any image for color grading and convert to professional LUTs. Extract color science 
              from reference images, analyze existing LUTs, and optimize for DaVinci Resolve, Premiere Pro, and more.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/convert">
              <Button size="lg" data-testid="button-get-started">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Image Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze any image (color graded footage, reference stills) to extract color science and generate LUTs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">LUT Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze existing LUTs for quality issues. Detect banding, invalid points, and optimize for production use.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Format Conversion</h3>
                <p className="text-sm text-muted-foreground">
                  Convert between .cube, .3dl, and other formats. Compatible with all major editing software.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="mt-20 space-y-6">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-4 text-left">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold">Upload Image or LUT</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a color graded image or existing LUT file
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">Analyze & Extract</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze color information and extract LUT data
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Analyze & Optimize</h3>
                <p className="text-sm text-muted-foreground">
                  Detect quality issues, fix banding, and optimize
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-semibold">Convert & Export</h3>
                <p className="text-sm text-muted-foreground">
                  Download in any format ready for production
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-20 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Choose Your Plan</h2>
              <p className="text-muted-foreground">
                Start free, upgrade when you need advanced features
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Free Tier */}
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For getting started</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$0</span>
                    <span className="text-muted-foreground">/forever</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">LUT format conversion (.cube ↔ .3dl)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">LUT quality analysis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Detect banding & invalid points</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Up to 3 saved presets</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Basic grid size conversion</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/convert" className="w-full">
                    <Button variant="outline" className="w-full" data-testid="button-free-plan">
                      Get Started Free
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card className="border-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pro</CardTitle>
                    <Badge>Popular</Badge>
                  </div>
                  <CardDescription>For professional colorists</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$15</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Everything in Free</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Save unlimited custom presets</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Advanced grid size options (17/33/65)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Unlimited conversions per month</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Image color analysis & LUT extraction</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Batch processing (coming soon)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/auth" className="w-full">
                    <Button className="w-full" data-testid="button-pro-plan">
                      Upgrade to Pro
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Studio Tier */}
              <Card>
                <CardHeader>
                  <CardTitle>Studio</CardTitle>
                  <CardDescription>For teams and studios</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Custom</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Everything in Pro</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Video LUT processing (planned)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">API access (planned)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Team collaboration (planned)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">Dedicated support (planned)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled data-testid="button-studio-plan">
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>ColorKit by Untitled • Professional LUT tools for cinematographers</p>
        </div>
      </footer>
    </div>
  );
}
