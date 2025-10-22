import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Zap, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function Resources() {
  const resources = [
    {
      title: "Quick Start Guide",
      description: "Streamlined workflow for generating professional LUTs from reference images. Upload, configure, and download in minutes.",
      icon: Zap,
      href: "/resources/create-from-images"
    },
    {
      title: "Installation Guides",
      description: "Step-by-step installation instructions for DaVinci Resolve, Premiere Pro, Final Cut Pro, and professional editing software.",
      icon: Download,
      href: "/resources/install-luts"
    },
    {
      title: "Format Selection",
      description: "Choose the optimal LUT format (.cube, .3dl, .lut, .look, .xmp) based on your editing software, tier, and workflow requirements.",
      icon: HelpCircle,
      href: "/resources/lut-formats"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary/80">Documentation Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Resources & Guides
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto px-4 leading-relaxed">
            Comprehensive documentation for CHROMA workflows. Learn to generate, convert, and implement professional LUTs.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href}>
                <Card className="hover-elevate active-elevate-2 bg-background/80 backdrop-blur-sm border-primary/20 h-full cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow" data-testid={`card-${resource.href.split('/').pop()}`}>
                  <CardHeader className="p-6 sm:p-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-primary/30 to-chart-2/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <resource.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl text-center flex items-center justify-center gap-2 mb-3">
                      {resource.title}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:inline" />
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-center">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link href="/learn-more">
              <Card className="hover-elevate active-elevate-2 bg-gradient-to-br from-background/80 to-chart-3/5 backdrop-blur-sm border-chart-3/30 cursor-pointer group shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-chart-3/30 to-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-chart-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl sm:text-2xl flex items-center justify-between mb-2">
                        <span>Chroma Science Deep Dive</span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all hidden sm:inline flex-shrink-0" />
                      </CardTitle>
                      <CardDescription className="text-base sm:text-lg">
                        Explore the six-stage professional color science pipeline, industry standards, and cinema-grade processing techniques
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
