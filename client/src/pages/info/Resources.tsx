import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Palette, Grid3x3, ArrowRight } from "lucide-react";

export default function Resources() {
  const resources = [
    {
      title: "How to Install LUTs",
      description: "Step-by-step guides for installing LUTs in popular software like DaVinci Resolve, Premiere Pro, Final Cut Pro, and Photoshop.",
      icon: Download,
      href: "/resources/install-luts",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "LUT Formats Explained",
      description: "Learn about .cube, .3dl, and .lut formats, their differences, and when to use each one in your workflow.",
      icon: Grid3x3,
      href: "/resources/lut-formats",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Creating LUTs from Images",
      description: "Discover how to extract authentic color grading from reference images using CHROMA's Image-to-LUT generator.",
      icon: Palette,
      href: "/resources/create-from-images",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-400 to-pink-500">
              Resources
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about LUTs, from installation guides to understanding formats and creating your own color grades.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href}>
                <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 h-full cursor-pointer group" data-testid={`card-${resource.href.split('/').pop()}`}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${resource.color} opacity-20 flex items-center justify-center mb-4 group-hover:opacity-30 transition-opacity`}>
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

      {/* CTA Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to start creating?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Try CHROMA's Image-to-LUT generator and extract professional color grading from any reference image.
              </p>
              <Link href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" data-testid="button-get-started-cta">
                  Get Started — Free Forever
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
