import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ColorParticles } from './ColorParticles';
import { FilmGrain } from './FilmGrain';
import { ChevronDown, Check } from 'lucide-react';

export function HeroSection() {
  const [autoSlide, setAutoSlide] = useState(true);

  // Example images - replace with actual before/after LUT images
  const beforeImage = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80";
  const afterImage = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80&sat=-100&contrast=120";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background particles */}
      <ColorParticles count={40} />
      
      {/* Film grain overlay */}
      <FilmGrain opacity={0.04} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Check className="w-3 h-3 mr-1" />
                VES Technology Committee
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Check className="w-3 h-3 mr-1" />
                CIE 1976 Standard
              </Badge>
            </div>

            {/* Hero headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="block">Cinema-Grade</span>
                <span className="block bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  Color Science.
                </span>
                <span className="block">Zero Guesswork.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Professional LUT generation built on VES + CIE standards. Extract authentic color science from any reference image.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 text-white shadow-lg hover:shadow-xl transition-shadow"
                data-testid="button-get-started"
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="backdrop-blur-sm"
                data-testid="button-see-science"
              >
                <ChevronDown className="w-4 h-4 mr-2" />
                See The Science
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Colorists Worldwide</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1.2M</div>
                <div className="text-sm text-muted-foreground">Color Points Processed</div>
              </div>
            </div>
          </div>

          {/* Right: Before/After Slider */}
          <div className="relative">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Flat / Ungraded"
              afterLabel="Cinema-Graded"
            />
            
            {/* Processing indicator */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-mono">Processing 1.2M color points...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
