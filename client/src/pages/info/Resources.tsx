import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Zap, HelpCircle, ArrowRight, BookOpen } from "lucide-react";

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
      description: "Choose the optimal LUT format (.cube, .3dl, .lut) based on your editing software and workflow requirements.",
      icon: HelpCircle,
      href: "/resources/lut-formats"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects - matching Landing page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-chart-3/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-400 to-pink-500">
              Resources & Guides
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive documentation for CHROMA workflows. Learn to generate, convert, and implement professional LUTs.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href}>
                <Card className="hover-elevate active-elevate-2 bg-background/80 backdrop-blur-sm h-full cursor-pointer group" data-testid={`card-${resource.href.split('/').pop()}`}>
                  <CardHeader>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                      <resource.icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-center flex items-center justify-center gap-2">
                      {resource.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-center pt-2">
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
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <Link href="/learn-more">
              <Card className="hover-elevate active-elevate-2 bg-background/80 backdrop-blur-sm cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center justify-between">
                        How CHROMA Works
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardTitle>
                      <CardDescription className="text-sm pt-1">
                        Deep dive into color science, LUT generation algorithms, and processing pipeline
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
