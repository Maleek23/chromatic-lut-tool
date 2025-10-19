import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grid3x3, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export default function LutFormats() {
  const formats = [
    {
      name: ".cube",
      fullName: "3D LUT Cube",
      compatibility: "Excellent",
      gridSizes: "Variable (17³, 33³, 65³, etc.)",
      precision: "0.0 - 1.0 (normalized)",
      software: ["DaVinci Resolve", "Premiere Pro", "Final Cut Pro", "Photoshop", "After Effects"],
      pros: [
        "Most widely supported format",
        "Variable grid sizes for different precision needs",
        "Industry standard",
        "Supports complex 3D color transformations"
      ],
      cons: [
        "Larger file sizes than 1D LUTs"
      ],
      bestFor: "Professional color grading, complex adjustments, maximum compatibility",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: ".3dl",
      fullName: "3D LUT",
      compatibility: "Good",
      gridSizes: "Fixed (33³)",
      precision: "0 - 4095 (12-bit)",
      software: ["DaVinci Resolve", "Premiere Pro", "Avid Media Composer", "Nuke"],
      pros: [
        "High precision with 12-bit values",
        "Popular in professional workflows",
        "Excellent for technical color conversions",
        "Standard in broadcast and cinema"
      ],
      cons: [
        "Fixed grid size only",
        "Less compatible than .cube",
        "Larger file sizes"
      ],
      bestFor: "Professional video production, broadcast, high-precision color work",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: ".lut",
      fullName: "1D LUT",
      compatibility: "Limited",
      gridSizes: "1D only (256 or 1024 entries)",
      precision: "Variable",
      software: ["DaVinci Resolve", "Some editing software"],
      pros: [
        "Smallest file size",
        "Fast processing",
        "Simple color adjustments"
      ],
      cons: [
        "Limited to per-channel adjustments only",
        "Cannot handle complex color transformations",
        "Less compatible than 3D formats",
        "No cross-channel color manipulation"
      ],
      bestFor: "Simple contrast/exposure adjustments, technical conversions only",
      color: "from-green-500 to-emerald-500"
    }
  ];

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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6">
            <Grid3x3 className="w-7 h-7 text-purple-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            LUT Formats Explained
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Understanding .cube, .3dl, and .lut formats will help you choose the right LUT for your workflow.
          </p>
          
          {/* Quick Comparison */}
          <Card className="bg-gradient-to-br from-primary/5 to-chart-2/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Quick Recommendation</h3>
              <p className="text-sm text-muted-foreground">
                For most users, <strong className="text-foreground">.cube format</strong> is the best choice. It offers maximum compatibility across all major editing software, supports variable grid sizes, and is the industry standard for professional color grading.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Format Cards */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {formats.map((format) => (
            <Card key={format.name} className="overflow-hidden" data-testid={`card-${format.name.replace('.', '')}`}>
              <div className={`h-2 bg-gradient-to-r ${format.color}`} />
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {format.name} <span className="text-base font-normal text-muted-foreground">({format.fullName})</span>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {format.bestFor}
                    </CardDescription>
                  </div>
                  <Badge className={`bg-gradient-to-r ${format.color} border-0`}>
                    {format.compatibility} Compatibility
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Grid Sizes</h4>
                    <p className="text-sm">{format.gridSizes}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Precision</h4>
                    <p className="text-sm">{format.precision}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-1">Compatibility</h4>
                    <p className="text-sm">{format.compatibility}</p>
                  </div>
                </div>

                {/* Software Support */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Supported Software</h4>
                  <div className="flex flex-wrap gap-2">
                    {format.software.map((sw) => (
                      <Badge key={sw} variant="outline" className="text-xs">
                        {sw}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Advantages
                    </h4>
                    <ul className="space-y-2">
                      {format.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {format.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Understanding Section */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Understanding 3D vs 1D LUTs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">3D LUTs (.cube, .3dl)</h4>
                <p className="text-sm text-muted-foreground">
                  3D LUTs map colors in three-dimensional space (Red, Green, Blue). This allows for complex color transformations where each input color can be mapped to any output color. Perfect for creative color grading, film emulation, and complex color corrections.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">1D LUTs (.lut)</h4>
                <p className="text-sm text-muted-foreground">
                  1D LUTs adjust each color channel independently (Red, Green, Blue separately). They can only change contrast, exposure, and individual channel curves. They cannot shift colors (like making blue into orange) or perform cross-channel adjustments. Best for simple technical corrections only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Choosing Format Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>How to Choose the Right Format</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Check software compatibility</h4>
                    <p className="text-sm text-muted-foreground">
                      If you use multiple editing programs, choose .cube for maximum compatibility across all platforms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Consider your needs</h4>
                    <p className="text-sm text-muted-foreground">
                      For creative color grading: Use .cube or .3dl (3D LUTs)<br />
                      For simple technical adjustments: .lut (1D LUT) may suffice
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Grid size matters</h4>
                    <p className="text-sm text-muted-foreground">
                      Larger grids (33³, 65³) provide smoother gradations but larger file sizes. Start with 33³ for a good balance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <strong>CHROMA supports all major formats:</strong> Generate .cube, .3dl, or .lut files based on your tier. Free and Creator tiers can export .cube format, while Pro and Studio tiers unlock all formats.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="mt-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Convert between LUT formats</h3>
                  <p className="text-sm text-muted-foreground">
                    Use CHROMA's LUT Converter to convert between .cube, .3dl, and .lut formats.
                  </p>
                </div>
                <Link href="/tools">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" data-testid="button-try-converter">
                    Try Converter
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
