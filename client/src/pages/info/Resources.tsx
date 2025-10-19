import { Link } from "wouter";
import { NavBar } from "@/components/layout/NavBar";
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
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Resources & Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Comprehensive documentation for CHROMA workflows. Learn to generate, convert, and implement professional LUTs in your color grading pipeline.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href}>
                <Card className="hover-elevate active-elevate-2 h-full cursor-pointer group" data-testid={`card-${resource.href.split('/').pop()}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 border group-hover:border-primary/50 transition-colors">
                      <resource.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl flex items-center justify-between">
                      {resource.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed pt-2">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-3">Technical Documentation</h2>
              <p className="text-muted-foreground mb-4">
                For in-depth technical specifications, color science pipeline details, and advanced workflows, refer to our comprehensive technical documentation.
              </p>
              <Link href="/how-it-works">
                <Card className="hover-elevate active-elevate-2 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      How It Works
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription>
                      Deep dive into CHROMA's color science, LUT generation algorithms, and processing pipeline
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
