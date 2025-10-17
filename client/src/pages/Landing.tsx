import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, RefreshCw, BarChart3, Download } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-medium text-primary">by Untitled</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              ColorKit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional LUT conversion and optimization toolkit. Convert between formats, 
              detect banding, smooth transitions, and optimize your color grading files.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/tool">
              <Button size="lg" data-testid="button-get-started">
                <Sparkles className="w-4 h-4 mr-2" />
                Launch ColorKit
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
                <h3 className="font-semibold">Convert LUTs</h3>
                <p className="text-sm text-muted-foreground">
                  Seamlessly convert between .cube, .3dl, and other LUT formats. Works with DaVinci Resolve, Premiere, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Analyze & Detect</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically detect banding, invalid cube points, and visualize tone curves for quality control.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Optimize & Clean</h3>
                <p className="text-sm text-muted-foreground">
                  Smooth transitions, fix banding artifacts, and export optimized LUTs ready for production.
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
                <h3 className="font-semibold">Upload LUT</h3>
                <p className="text-sm text-muted-foreground">
                  Drop your .cube or .3dl LUT file
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Detect banding, invalid points, and quality issues
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Optimize</h3>
                <p className="text-sm text-muted-foreground">
                  Clean, smooth, and fix your LUT automatically
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
