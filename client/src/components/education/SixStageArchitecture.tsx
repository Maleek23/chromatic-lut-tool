import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ColorCube3D } from '@/components/visual/ColorCube3D';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Stage {
  number: number;
  name: string;
  technical: string;
  description: string;
  whyMatters: string;
  visualization: React.ReactNode;
  details: string[];
}

const stages: Stage[] = [
  {
    number: 1,
    name: "CIE L*a*b* Transform",
    technical: "Perceptually Uniform Color Space",
    description: "Transforms RGB colors into the CIE L*a*b* color space, ensuring perceptually uniform color processing.",
    whyMatters: "RGB values don't match human perception. L*a*b* ensures equal mathematical changes produce equal visual changes.",
    visualization: <ColorCube3D size={220} rotating={true} />,
    details: [
      "Converts from device-dependent RGB to perceptual L*a*b*",
      "Lightness (L*) separated from color (a*, b*)",
      "Enables accurate skin tone detection and protection",
      "Foundation for professional color grading"
    ]
  },
  {
    number: 2,
    name: "K-means Clustering",
    technical: "Dominant Color Extraction",
    description: "Analyzes image to extract 5-8 dominant color clusters, identifying the essential color palette.",
    whyMatters: "Reduces millions of colors to core palette without losing visual essence. Essential for authentic LUT generation.",
    visualization: (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {['#6b2dd9', '#00d4ff', '#ff0080', '#00ff88', '#ffb800', '#ff3366', '#a0a0a0', '#ffffff'].map((color, i) => (
            <div
              key={i}
              className="w-full aspect-square rounded-lg border-2 border-border shadow-md"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground font-mono">Extracted Color Palette</p>
      </div>
    ),
    details: [
      "Identifies 5-8 dominant color clusters",
      "Preserves color relationships and intensity",
      "Handles complex gradients smoothly",
      "Optimized for cinematic color palettes"
    ]
  },
  {
    number: 3,
    name: "Filmic Tone Curves",
    technical: "Cinema S-Curve Application",
    description: "Applies professional film-style tone curves for natural highlight rolloff and shadow detail preservation.",
    whyMatters: "Linear curves look harsh. Filmic S-curves create the organic, cinema-grade tonal response viewers expect.",
    visualization: (
      <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto">
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--chart-2))" />
          </linearGradient>
        </defs>
        {/* Grid */}
        <g stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3">
          {[0, 50, 100, 150, 200].map(v => (
            <>
              <line key={`h-${v}`} x1="20" y1={v * 0.9 + 10} x2="190" y2={v * 0.9 + 10} />
              <line key={`v-${v}`} x1={v * 0.85 + 20} y1="10" x2={v * 0.85 + 20} y2="190" />
            </>
          ))}
        </g>
        {/* Linear curve (reference) */}
        <line x1="20" y1="190" x2="190" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
        {/* S-Curve (filmic) */}
        <path
          d="M 20 190 Q 60 170, 80 130 T 140 50 T 190 10"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="100" y="205" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="JetBrains Mono">
          Input →
        </text>
        <text x="5" y="100" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(-90 5 100)">
          Output →
        </text>
      </svg>
    ),
    details: [
      "Smooth highlight rolloff (prevents clipping)",
      "Rich shadow detail retention",
      "Emulates film stock response curves",
      "Professional cinema-grade tonality"
    ]
  },
  {
    number: 4,
    name: "Skin Tone Protection",
    technical: "Selective Color Preservation",
    description: "Detects and protects skin tone ranges to prevent unnatural color shifts in portraits and people.",
    whyMatters: "Aggressive color grading can make skin tones look alien. Protection ensures natural, flattering skin across all ethnicities.",
    visualization: (
      <div className="relative w-full max-w-[220px] mx-auto aspect-square">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Color wheel */}
          <defs>
            <radialGradient id="skinGradient">
              <stop offset="0%" stopColor="#f5d5c0" />
              <stop offset="100%" stopColor="#8d5524" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          {/* Skin tone protected arc */}
          <path
            d="M 140 40 A 80 80 0 0 1 160 100"
            fill="none"
            stroke="url(#skinGradient)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="3" fill="hsl(var(--primary))" />
          <text x="100" y="100" dy="20" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
            Protected Zone
          </text>
        </svg>
      </div>
    ),
    details: [
      "Identifies skin tone vector in L*a*b* space",
      "Protects hues from 15°-50° (skin tone line)",
      "Works across all skin tones and ethnicities",
      "Prevents unnatural green/magenta casts"
    ]
  },
  {
    number: 5,
    name: "Gamut Compression",
    technical: "Color Space Mapping",
    description: "Safely compresses out-of-gamut colors into target color space (Rec.709/P3/Rec.2020) while preserving hue.",
    whyMatters: "Different displays have different color ranges. Compression ensures your LUT works everywhere without clipping.",
    visualization: (
      <div className="space-y-2">
        <div className="flex gap-2 justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-primary rounded-lg bg-gradient-to-br from-primary/30 to-chart-2/30" />
            <p className="text-[10px] mt-1 text-muted-foreground">Rec.709</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 border-2 border-chart-2 rounded-lg bg-gradient-to-br from-primary/40 to-chart-3/40" />
            <p className="text-[10px] mt-1 text-muted-foreground">P3</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 border-2 border-chart-3 rounded-lg bg-gradient-to-br from-primary/50 to-chart-3/50" />
            <p className="text-[10px] mt-1 text-muted-foreground">Rec.2020</p>
          </div>
        </div>
      </div>
    ),
    details: [
      "Supports Rec.709, P3, and Rec.2020 gamuts",
      "Hue-preserving compression algorithm",
      "Prevents color clipping artifacts",
      "Broadcast and cinema-safe output"
    ]
  },
  {
    number: 6,
    name: "Chromatic Adaptation",
    technical: "White Balance Correction",
    description: "Adapts colors to different lighting conditions, ensuring consistent look across varying white points.",
    whyMatters: "Reference images shot in different lighting look inconsistent. Adaptation neutralizes lighting bias for universal application.",
    visualization: (
      <div className="grid grid-cols-3 gap-2">
        {[
          { temp: '3200K', color: 'from-orange-400 to-orange-600', label: 'Warm' },
          { temp: '5500K', color: 'from-gray-200 to-gray-400', label: 'Neutral' },
          { temp: '7500K', color: 'from-blue-300 to-blue-500', label: 'Cool' }
        ].map(({ temp, color, label }) => (
          <div key={temp} className="text-center">
            <div className={`w-full aspect-square rounded-lg bg-gradient-to-br ${color} border border-border`} />
            <p className="text-[9px] mt-1 text-muted-foreground font-mono">{temp}</p>
            <p className="text-[8px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    ),
    details: [
      "Detects image white point (color temperature)",
      "Applies chromatic adaptation transform",
      "Neutralizes lighting color cast",
      "Ensures consistent color reproduction"
    ]
  }
];

export function SixStageArchitecture() {
  const [currentStage, setCurrentStage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const goToStage = (index: number) => {
    const newIndex = Math.max(0, Math.min(stages.length - 1, index));
    setCurrentStage(newIndex);
    
    // Scroll to the stage card
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Sync currentStage with manual scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      
      if (newIndex !== currentStage && newIndex >= 0 && newIndex < stages.length) {
        setCurrentStage(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentStage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToStage(currentStage - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToStage(currentStage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStage]);

  const stage = stages[currentStage];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4" data-testid="badge-architecture-label">
            Cinema-Grade Pipeline
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Six-Stage Color Science Architecture
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional color pipeline built on VES and CIE standards. Each stage is scientifically validated.
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {stages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStage
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              data-testid={`button-stage-dot-${index + 1}`}
              aria-label={`Go to stage ${index + 1}`}
            />
          ))}
        </div>

        {/* Horizontal Scrolling Journey */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 pb-4 max-w-5xl mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {stages.map((stageData, index) => (
            <Card
              key={index}
              className="min-w-full snap-center flex-shrink-0 overflow-hidden"
              data-testid={`card-stage-${index + 1}`}
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left: Content */}
                <div className="space-y-6">
                  {/* Stage Number */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-bold text-primary/20" style={{ fontFamily: 'Montserrat' }} data-testid={`text-stage-${stageData.number}-number`}>
                      {stageData.number}
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold" data-testid={`text-stage-${stageData.number}-name`}>
                        {stageData.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-mono" data-testid={`text-stage-${stageData.number}-technical`}>
                        {stageData.technical}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-base leading-relaxed" data-testid={`text-stage-${stageData.number}-description`}>
                    {stageData.description}
                  </p>

                  {/* Why This Matters */}
                  <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg" data-testid={`section-stage-${stageData.number}-why-matters`}>
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold mb-1">Why This Matters</p>
                        <p className="text-sm text-muted-foreground" data-testid={`text-stage-${stageData.number}-why-matters-content`}>
                          {stageData.whyMatters}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div data-testid={`section-stage-${stageData.number}-details`}>
                    <p className="text-sm font-semibold mb-2">Technical Implementation:</p>
                    <ul className="space-y-1">
                      {stageData.details.map((detail, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2" data-testid={`text-stage-${stageData.number}-detail-${i + 1}`}>
                          <span className="text-primary mt-0.5">→</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Visualization */}
                <div className="flex flex-col items-center justify-center space-y-4" data-testid={`section-stage-${stageData.number}-visualization`}>
                  <div className="w-full flex items-center justify-center min-h-[240px]">
                    {stageData.visualization}
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    Stage {stageData.number} Visualization
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => goToStage(currentStage - 1)}
            disabled={currentStage === 0}
            data-testid="button-prev-stage"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                  <span className="text-sm font-medium">
                    Stage {currentStage + 1} of {stages.length}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use arrow keys to navigate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="outline"
            size="lg"
            onClick={() => goToStage(currentStage + 1)}
            disabled={currentStage === stages.length - 1}
            data-testid="button-next-stage"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Minimap */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stages.map((s, index) => (
            <button
              key={index}
              onClick={() => goToStage(index)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                index === currentStage
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              data-testid={`button-minimap-stage-${index + 1}`}
            >
              <div className="text-3xl font-bold text-primary/40 mb-1" style={{ fontFamily: 'Montserrat' }}>
                {s.number}
              </div>
              <div className="text-xs font-semibold line-clamp-2">{s.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
