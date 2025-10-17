import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Image, Download, Sliders } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Professional LUT Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Analyze any image and generate professional color grading LUTs for your video editing workflow. 
              Works with DaVinci Resolve, Premiere Pro, and more.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/tool">
              <Button size="lg" data-testid="button-get-started">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Image className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Upload & Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Upload any image and our tool analyzes the color profile, histograms, and tonal distribution.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Sliders className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Fine-Tune Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust temperature, tint, shadows, midtones, and highlights to craft your perfect look.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Download LUTs</h3>
                <p className="text-sm text-muted-foreground">
                  Export professional .cube or .3dl files ready to use in any video editor.
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
                <h3 className="font-semibold">Upload Image</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a reference image with the color grade you want
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">Analyze Colors</h3>
                <p className="text-sm text-muted-foreground">
                  Our tool extracts color data and tonal information
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Adjust Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Fine-tune the look with advanced color controls
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-semibold">Generate LUT</h3>
                <p className="text-sm text-muted-foreground">
                  Download your professional LUT file and apply to videos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Professional color grading made simple</p>
        </div>
      </footer>
    </div>
  );
}
