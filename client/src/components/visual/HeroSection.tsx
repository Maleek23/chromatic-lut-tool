import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Check } from 'lucide-react';
import logoImage from "@assets/logo-full-transparent-v2.png";
import { AnimatedUntitld } from '@/components/visual/AnimatedUntitld';

export function HeroSection() {
  const scrollToScience = () => {
    const scienceSection = document.querySelector('[data-section="six-stage"]');
    if (scienceSection) {
      scienceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glowing coral pink orb - centered, static */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-chart-2/20 rounded-full blur-[200px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-chart-2/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Logo centered with By UN/TITLD below */}
          <div className="flex flex-col items-center justify-center gap-2">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="CHROMA" 
                className="h-32 sm:h-40 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer animate-in fade-in duration-700" 
              />
            </Link>
            <div className="text-xs text-foreground/90 animate-in fade-in duration-700 delay-150 whitespace-nowrap">
              By <span className="font-semibold bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent"><AnimatedUntitld /></span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            <Badge variant="outline" className="text-xs border-border/50">
              <Check className="w-3 h-3 mr-1" />
              VES Technology Committee
            </Badge>
            <Badge variant="outline" className="text-xs border-border/50">
              <Check className="w-3 h-3 mr-1" />
              CIE 1976 Standard
            </Badge>
          </div>

          {/* Hero headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block">Cinema-Grade</span>
              <span className="block bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Color Science.
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional LUT generation built on VES + CIE standards. Extract authentic color science from any reference image.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-white shadow-lg hover:shadow-xl transition-shadow"
              data-testid="button-get-started"
              asChild
            >
              <Link href="/auth">Get Started Free</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="backdrop-blur-sm"
              data-testid="button-see-science"
              onClick={scrollToScience}
            >
              <ChevronDown className="w-4 h-4 mr-2" />
              See The Science
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 pt-8 justify-center">
            <div>
              <div className="text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Colorists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">1.2M</div>
              <div className="text-sm text-muted-foreground">Color Points</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
