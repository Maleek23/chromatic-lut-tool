import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Settings, Download, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function CreateFromImages() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Generate professional LUTs from reference images in three simple steps.
          </p>
        </div>
      </section>

      {/* Visual Process Diagram */}
      <section className="relative z-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
              {/* Desktop flow */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-primary/5 to-chart-2/5">
                    <div className="text-sm font-medium mb-1 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">1. Upload</div>
                    <div className="text-xs text-muted-foreground">Reference image</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-2/5 to-chart-3/5">
                    <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">2. Configure</div>
                    <div className="text-xs text-muted-foreground">Grid & format</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-3/5 to-primary/5">
                    <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-3 to-primary bg-clip-text text-transparent">3. Generate</div>
                    <div className="text-xs text-muted-foreground">Download LUT</div>
                  </div>
                </div>
              </div>
              
              {/* Mobile flow */}
              <div className="sm:hidden space-y-4">
                <div className="text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-primary/5 to-chart-2/5">
                  <div className="text-sm font-medium mb-1 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">1. Upload</div>
                  <div className="text-xs text-muted-foreground">Reference image</div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                </div>
                <div className="text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-2/5 to-chart-3/5">
                  <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">2. Configure</div>
                  <div className="text-xs text-muted-foreground">Grid & format</div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                </div>
                <div className="text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-3/5 to-primary/5">
                  <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-3 to-primary bg-clip-text text-transparent">3. Generate</div>
                  <div className="text-xs text-muted-foreground">Download LUT</div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-md border border-primary/30 bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center">
                  <span className="text-sm font-mono text-primary">1</span>
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-semibold">Upload Reference Image</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Select a reference image with the color grading aesthetic you want to extract. Cinema stills, professional photography, or curated Instagram posts work well.
                  </p>
                  <div className="pt-2 space-y-2">
                    <p className="text-xs font-medium text-foreground">Requirements:</p>
                    <ul className="text-xs text-muted-foreground space-y-1 pl-4 list-disc leading-relaxed">
                      <li>Properly exposed images with visible detail</li>
                      <li>Supported: JPG, PNG, WEBP, HEIC, TIFF, BMP, GIF</li>
                      <li>Size limits: Free 10MB, Creator 50MB, Pro 100MB, Studio 200MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-md border border-chart-2/30 bg-gradient-to-br from-chart-2/10 to-chart-3/10 flex items-center justify-center">
                  <span className="text-sm font-mono text-chart-2">2</span>
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-semibold">Configure Export Settings</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Choose grid resolution and output format based on your workflow requirements and subscription tier.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Grid Resolution</p>
                      <p className="text-xs text-muted-foreground">Free: 17×17×17 only</p>
                      <p className="text-xs text-muted-foreground">Creator+: 33³, 65³</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">Output Format</p>
                      <p className="text-xs text-muted-foreground">Free: .cube only</p>
                      <p className="text-xs text-muted-foreground">Creator+: .3dl, .look, .xmp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-md border border-chart-3/30 bg-gradient-to-br from-chart-3/10 to-primary/10 flex items-center justify-center">
                  <span className="text-sm font-mono text-chart-3">3</span>
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-semibold">Generate and Download</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    CHROMA processes your image through its color science pipeline and generates a production-ready LUT file.
                  </p>
                  <div className="pt-2 space-y-2">
                    <p className="text-xs font-medium text-foreground">Processing Pipeline:</p>
                    <ol className="text-xs text-muted-foreground space-y-1 pl-4 list-decimal leading-relaxed">
                      <li>Image analysis and color space conversion</li>
                      <li>Tonal zone extraction (shadows, midtones, highlights)</li>
                      <li>LUT generation with professional metadata</li>
                      <li>Download ready for installation</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-lg font-semibold">Next Steps</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/resources/install-luts">
              <div className="hover-elevate active-elevate-2 p-5 border border-border rounded-md cursor-pointer group transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Installation Guides</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  DaVinci Resolve, Premiere Pro, and more
                </p>
              </div>
            </Link>
            
            <Link href="/resources/lut-formats">
              <div className="hover-elevate active-elevate-2 p-5 border border-border rounded-md cursor-pointer group transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Format Selection</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Choose the right LUT format for your workflow
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
