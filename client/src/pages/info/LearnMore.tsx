import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Zap,
  Check,
  Atom,
  Layers,
  Palette,
  Shield,
  Activity,
  Sun
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function LearnMore() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const pipelineStages = [
    {
      id: 1,
      icon: Atom,
      title: "CIE L*a*b* Transform",
      gradient: "from-primary to-chart-2",
      bgGradient: "from-primary/10 to-chart-2/10",
      description: "Perceptually uniform color space ensures natural-looking grading that matches human vision"
    },
    {
      id: 2,
      icon: Activity,
      title: "K-means Clustering",
      gradient: "from-chart-2 to-chart-3",
      bgGradient: "from-chart-2/10 to-chart-3/10",
      description: "Intelligent multi-cluster sampling extracts dominant colors from reference images"
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Filmic Tone Curves",
      gradient: "from-chart-3 to-primary",
      bgGradient: "from-chart-3/10 to-primary/10",
      description: "Cinema-grade curves create professional tonality with smooth highlight rolloff"
    },
    {
      id: 4,
      icon: Shield,
      title: "Skin Tone Protection",
      gradient: "from-primary to-chart-2",
      bgGradient: "from-primary/10 to-chart-2/10",
      description: "Perceptual preservation maintains natural skin tones under aggressive grading"
    },
    {
      id: 5,
      icon: Palette,
      title: "Gamut Compression",
      gradient: "from-chart-2 to-chart-3",
      bgGradient: "from-chart-2/10 to-chart-3/10",
      description: "Hue-preserving compression ensures broadcast compliance"
    },
    {
      id: 6,
      icon: Sun,
      title: "Chromatic Adaptation",
      gradient: "from-chart-3 to-primary",
      bgGradient: "from-chart-3/10 to-primary/10",
      description: "Automatic white balance correction across varied lighting"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10" />
        <div className="container mx-auto px-4 pt-16 pb-24 max-w-6xl relative z-10">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="mb-2 bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20">
              Professional Color Science
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground leading-tight">
              Cinema-Grade Color Science
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Industry-verified pipeline built on VES Technology Committee and CIE specifications for production-ready LUT generation
            </p>
          </div>

          {/* Key Principles - Compact */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20 hover-elevate transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Industry Standards</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                VES Technology Committee and CIE chroma science specifications
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-chart-2/20 hover-elevate transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-3/10">
                  <Atom className="w-4 h-4 text-chart-2" />
                </div>
                <h3 className="font-semibold text-sm">Perceptual Color</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                CIE L*a*b* transformations matching human vision, not just RGB math
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background/80 backdrop-blur-sm border border-chart-3/20 hover-elevate transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-chart-3/10 to-primary/10">
                  <Layers className="w-4 h-4 text-chart-3" />
                </div>
                <h3 className="font-semibold text-sm">Production Ready</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Compatible with DaVinci Resolve, Premiere Pro, Final Cut Pro
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Six-Stage Pipeline - Visual Flow */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
            Six-Stage Professional Pipeline
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Cinema-quality color extraction through precision processing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className={`relative p-5 rounded-xl bg-background/80 backdrop-blur-sm border transition-all duration-300 ${
                  hoveredStage === stage.id 
                    ? 'border-primary/50 shadow-lg scale-105' 
                    : 'border-border/50 hover-elevate'
                }`}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stage.bgGradient}`}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`bg-gradient-to-r ${stage.gradient} text-white text-[10px] px-1.5 py-0 border-0 h-4`}>
                        {stage.id}
                      </Badge>
                      <h3 className="font-semibold text-sm">{stage.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools - Accordion Style */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
            Professional Toolkit
          </h2>
          <p className="text-base text-muted-foreground">
            Comprehensive color science tools for modern workflows
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4" defaultValue="generator">
          {/* Image to LUT Generator */}
          <AccordionItem value="generator" className="border-0">
            <Card className="bg-background/80 backdrop-blur-sm border-primary/30 overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline">
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">Image to LUT Generator</h3>
                      <Badge className="bg-gradient-to-r from-primary to-chart-2 text-white text-[10px] px-2 py-0 border-0">
                        FLAGSHIP
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Extract authentic color grading from reference images
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Uses <span className="text-foreground font-semibold">cinema-grade color science</span> to extract authentic grading from reference images. 
                    Implements a professional pipeline with <span className="text-foreground font-semibold">CIE L*a*b* perceptual color space</span>, 
                    <span className="text-foreground font-semibold"> intelligent clustering</span>, <span className="text-foreground font-semibold">cinema-grade tone curves</span>, 
                    and <span className="text-foreground font-semibold">gamut compression</span>.
                  </p>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <h4 className="text-xs font-semibold">Industry Standards</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        VES Technology Committee and CIE chroma science standards with industry-standard color transformations
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-chart-2/5 to-chart-3/5 border border-chart-2/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 rounded-full bg-chart-2" />
                        <h4 className="text-xs font-semibold">Format Support</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Free: .cube • Creator: .cube/.3dl/.look • Pro: All 5 formats including .xmp
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-chart-3/5 to-primary/5 border border-chart-3/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 rounded-full bg-chart-3" />
                        <h4 className="text-xs font-semibold">Precision Control</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Adjustable intensity • Grid sizes: 17³/33³/65³ • 8/10/12-bit precision
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <h4 className="text-xs font-semibold">Real-time Preview</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        See your LUT applied instantly with adjustable intensity before export
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* LUT Converter */}
          <AccordionItem value="converter" className="border-0">
            <Card className="bg-background/80 backdrop-blur-sm border-chart-2/30 overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline">
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-2/10 to-chart-3/10 border border-chart-2/20">
                    <ArrowRight className="w-5 h-5 text-chart-2" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">LUT Format Converter</h3>
                    <p className="text-sm text-muted-foreground">
                      Universal format conversion with intelligent resampling
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Convert between LUT formats with <span className="text-foreground font-semibold">trilinear interpolation</span> to maintain smooth color gradients. 
                    Free tier converts to .cube. Creator+ converts between .cube/.3dl/.look. Pro tier supports all formats.
                  </p>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">ALL</Badge>
                        <h4 className="text-xs font-semibold">.cube</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Industry standard 3D LUT. Compatible with all major NLEs
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">CREATOR+</Badge>
                        <h4 className="text-xs font-semibold">.3dl & .look</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Professional Autodesk/Lustre formats for broadcast workflows
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">PRO+</Badge>
                        <h4 className="text-xs font-semibold">.lut & .xmp</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        1D LUT and Lightroom presets with tone curves
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* LUT Analyzer */}
          <AccordionItem value="analyzer" className="border-0">
            <Card className="bg-background/80 backdrop-blur-sm border-chart-3/30 overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline">
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/10 to-primary/10 border border-chart-3/20">
                    <TrendingUp className="w-5 h-5 text-chart-3" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">LUT Quality Analyzer</h3>
                      <Badge className="bg-gradient-to-r from-chart-3 to-primary text-white text-[10px] px-2 py-0 border-0">
                        PRO
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Professional quality scoring and issue detection
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ensure your LUTs meet professional standards with comprehensive analysis. Scans for banding issues, invalid color points, and out-of-range values.
                  </p>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Check className="w-4 h-4 text-chart-3 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold mb-1">Banding Detection</h4>
                        <p className="text-xs text-muted-foreground">
                          Identifies consecutive identical values creating visible color banding
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold mb-1">Invalid Points</h4>
                        <p className="text-xs text-muted-foreground">
                          Detects RGB values outside valid range causing clipping
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <TrendingUp className="w-4 h-4 text-chart-2 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold mb-1">Quality Scoring</h4>
                        <p className="text-xs text-muted-foreground">
                          Comprehensive score based on value distribution and standards
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Activity className="w-4 h-4 text-chart-3 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold mb-1">RGB Statistics</h4>
                        <p className="text-xs text-muted-foreground">
                          Detailed min/max/average RGB values per channel
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* LUT Optimizer */}
          <AccordionItem value="optimizer" className="border-0">
            <Card className="bg-background/80 backdrop-blur-sm border-primary/30 overflow-hidden">
              <AccordionTrigger className="px-6 py-5 hover:no-underline">
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">LUT Optimizer</h3>
                      <Badge className="bg-gradient-to-r from-chart-3 to-primary text-white text-[10px] px-2 py-0 border-0">
                        PRO
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Clean and optimize LUTs for production use
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6 space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automatically fix common LUT issues and optimize for professional workflows. Removes invalid color points, clamps out-of-range values, and ensures production-readiness.
                  </p>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold mb-1">Automatic Cleanup</h4>
                        <p className="text-xs text-muted-foreground">
                          Removes invalid points and clamps RGB values while preserving color integrity
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Check className="w-4 h-4 text-chart-2 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold mb-1">Format Validation</h4>
                        <p className="text-xs text-muted-foreground">
                          Ensures LUT meets format specifications and proper structure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>
      
      <Footer />
    </div>
  );
}
