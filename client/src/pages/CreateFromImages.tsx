import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Sparkles, CheckCircle2, ArrowRight, Zap } from "lucide-react";

export default function CreateFromImages() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/resources">
              <Button variant="ghost" size="sm" data-testid="button-back-resources">
                ← Back to Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-6">
            <Palette className="w-7 h-7 text-green-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Creating LUTs from Images
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Extract authentic color grading from any reference image and turn it into a professional LUT file you can apply to your own footage.
          </p>
          
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            CHROMA's Signature Feature
          </Badge>
        </div>
      </section>

      {/* What is Image-to-LUT */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>What is Image-to-LUT Generation?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Image-to-LUT generation is the process of analyzing a color-graded reference image and extracting its color science into a reusable LUT file. This allows you to apply the same color grading style to your own footage.
              </p>
              <p className="text-sm text-muted-foreground">
                Unlike simple "copy and paste" filters, CHROMA analyzes the tonal zones (shadows, midtones, highlights) and derives authentic color transformations that preserve the original grading intent.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How CHROMA Extracts Color Science</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Zone-Based Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      CHROMA analyzes your reference image by separating it into tonal zones: shadows (dark areas), midtones (medium brightness), and highlights (bright areas). This mirrors how professional colorists think about grading.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-chart-2">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Color Transform Extraction</h3>
                    <p className="text-sm text-muted-foreground">
                      For each zone, CHROMA calculates the color shifts and tonal adjustments. It looks at how colors are distributed and creates mathematical transformations that replicate the grading style.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-chart-3">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">3D LUT Generation</h3>
                    <p className="text-sm text-muted-foreground">
                      The extracted color science is encoded into a 3D LUT file with your chosen grid size (17×17×17, 33×33×33, or 65×65×65). Higher grid sizes provide smoother color transitions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to Create a LUT from an Image</h2>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Find a reference image</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose an image with color grading you want to replicate. This could be a movie still, a color-graded photo, or a frame from a video you admire. Best results come from well-exposed images with good color information.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upload to CHROMA</h4>
                    <p className="text-sm text-muted-foreground">
                      Go to the Image-to-LUT Generator tool, drag and drop your reference image, or click to browse. Supported formats: JPG, PNG, HEIC, WEBP, TIFF (max 25MB).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Adjust settings</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Configure your LUT generation settings:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• <strong>Intensity:</strong> Control how strong the color grading effect is (0-100%)</li>
                      <li>• <strong>Grid Size:</strong> Choose precision level (17³ for Free, up to 65³ for Pro)</li>
                      <li>• <strong>Format:</strong> Select .cube, .3dl, or .lut (tier-dependent)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Generate and download</h4>
                    <p className="text-sm text-muted-foreground">
                      Click "Generate LUT" and CHROMA will analyze the image and create your custom LUT file. Download it and install it in your editing software using our installation guides.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold mb-1">Pro Tip: Test with Similar Footage</p>
                    <p className="text-sm text-muted-foreground">
                      LUTs work best when applied to footage with similar lighting and exposure to your reference image. For example, if your reference is a daylight scene, apply the LUT to daylight footage for best results.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Best Practices */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Best Practices for Image-to-LUT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Do This
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✓ Use well-exposed reference images</p>
                <p>✓ Choose images with diverse tonal ranges</p>
                <p>✓ Start with 80-90% intensity and adjust</p>
                <p>✓ Test on similar lighting conditions</p>
                <p>✓ Use higher grid sizes (33³, 65³) for smoother results</p>
                <p>✓ Save successful LUTs as presets</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                  Avoid This
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✗ Using completely blown-out or underexposed images</p>
                <p>✗ Applying LUTs to vastly different lighting scenarios</p>
                <p>✗ Using 100% intensity without testing first</p>
                <p>✗ Relying on a single LUT for all footage types</p>
                <p>✗ Ignoring the importance of proper exposure before grading</p>
                <p>✗ Expecting one-click perfection (fine-tuning is normal)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Popular Use Cases</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-base">Film Emulation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Extract the look from classic film frames or modern cinema to recreate that aesthetic in your projects.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-base">Brand Consistency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Create LUTs from your brand's signature images to maintain consistent color grading across all content.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-base">Style Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Match the color grade of one shot to another for seamless editing and continuity.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <CardTitle className="text-base">Creative Exploration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Experiment with color palettes from photography, paintings, or other visual media.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to create your first LUT?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start with our free tier and generate up to 5 LUTs per month. Upgrade anytime for unlimited Image-to-LUT generations and advanced features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" data-testid="button-start-free">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Free Forever
                  </Button>
                </Link>
                <Link href="/resources/install-luts">
                  <Button size="lg" variant="outline" data-testid="button-installation-guide">
                    Installation Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
