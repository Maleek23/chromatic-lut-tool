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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Logo */}
          <div className="space-y-3">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="CHROMA" 
                className="h-20 sm:h-24 w-auto mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer animate-in fade-in duration-700" 
              />
            </Link>
            <p className="text-[10px] text-muted-foreground/60 animate-in fade-in duration-700 delay-150">
              by <span className="font-semibold"><AnimatedUntitld /></span>
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 justify-center">
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
          <div className="space-y-6 pt-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Cinema-Grade</span>
              <span className="block bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Color Science.
              </span>
              <span className="block">Zero Guesswork.</span>
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
