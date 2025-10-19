import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Zap, HelpCircle, ArrowRight, Lightbulb } from "lucide-react";

export default function Resources() {
  const resources = [
    {
      title: "5-Minute Quick Start",
      description: "New to CHROMA? Get your first LUT in 5 minutes with this simple walkthrough. Upload image, choose settings, download LUT.",
      icon: Zap,
      href: "/resources/create-from-images",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "How to Install LUTs",
      description: "Step-by-step guides for installing LUTs in DaVinci Resolve, Premiere Pro, Final Cut Pro, and Photoshop.",
      icon: Download,
      href: "/resources/install-luts",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Which Format Should I Use?",
      description: "Confused about .cube vs .3dl vs .lut? Simple decision tree to help you pick the right format for your software and workflow.",
      icon: HelpCircle,
      href: "/resources/lut-formats",
      color: "from-purple-500 to-pink-500"
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
              Beginner Guides
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Step-by-step practical guides to get you started quickly. No technical jargon, just simple how-to's for real-world use.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link key={resource.href} href={resource.href}>
                <Card className="hover-elevate active-elevate-2 bg-card border-2 transition-all duration-300 h-full cursor-pointer group relative overflow-visible" data-testid={`card-${resource.href.split('/').pop()}`}>
                  <CardHeader className="relative">
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${resource.color} rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300`} />
                    
                    {/* Icon with vibrant gradient */}
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <resource.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <CardTitle className="text-xl flex items-center justify-between relative">
                      <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        {resource.title}
                      </span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed pt-2 relative">
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
