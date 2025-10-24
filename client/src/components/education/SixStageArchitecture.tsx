import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Stage {
  number: number;
  name: string;
  technical: string;
  description: string;
  visualization: React.ReactNode;
  details: string[];
}

const stages: Stage[] = [
  {
    number: 1,
    name: "CIE L*a*b* Transform",
    technical: "Perceptually Uniform Color Space",
    description: "Transforms RGB colors into the CIE L*a*b* color space, ensuring perceptually uniform color processing.",
    visualization: (
      <svg viewBox="0 0 200 200" className="w-full max-w-[220px] mx-auto">
        <defs>
          <linearGradient id="labGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--chart-2))" />
            <stop offset="100%" stopColor="hsl(var(--chart-3))" />
          </linearGradient>
        </defs>
        {/* L* axis (vertical) */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4" />
        {/* a* axis (red-green) */}
        <line x1="30" y1="100" x2="170" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4" />
        {/* b* axis (yellow-blue) */}
        <line x1="70" y1="50" x2="130" y2="150" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4" />
        
        {/* Center sphere with gradient */}
        <circle cx="100" cy="100" r="50" fill="url(#labGradient)" opacity="0.3" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="url(#labGradient)" strokeWidth="3" />
        
        {/* Axis labels */}
        <text x="100" y="15" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">L*</text>
        <text x="175" y="105" textAnchor="start" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">a*</text>
        <text x="135" y="155" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600">b*</text>
      </svg>
    ),
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
    visualization: (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--primary) / 0.6)', 'hsl(var(--chart-2) / 0.7)', 'hsl(var(--chart-3) / 0.8)', 'hsl(var(--muted-foreground))', 'hsl(var(--foreground))'].map((color, i) => (
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
        <text x="100" y="205" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
          Input →
        </text>
        <text x="5" y="100" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" transform="rotate(-90 5 100)">
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
  const containerRef = useRef<HTMLDivElement>(null);

  const goToStage = (index: number) => {
    const newIndex = Math.max(0, Math.min(stages.length - 1, index));
    setCurrentStage(newIndex);
  };

  const stage = stages[currentStage];

  return (
    <section className="py-20 relative z-10" data-section="six-stage">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Six-Stage Color Science Architecture
          </h2>
          <p className="text-base text-muted-foreground">
            Professional color pipeline built on VES and CIE standards. Each stage is scientifically validated.
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {stages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStage(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentStage
                  ? 'w-10 bg-foreground'
                  : 'w-1 bg-border hover:bg-muted-foreground/40'
              }`}
              data-testid={`button-stage-dot-${index + 1}`}
              aria-label={`Go to stage ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Stage Display */}
        <div ref={containerRef} className="mb-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12" data-testid={`card-stage-${currentStage + 1}`}>
            {/* Left: Content */}
            <div className="space-y-6">
              {/* Stage Number & Title */}
              <div className="space-y-2">
                <div className="text-sm font-mono text-muted-foreground" data-testid={`text-stage-${stage.number}-number`}>
                  Stage {stage.number}
                </div>
                <h3 className="text-2xl font-bold" data-testid={`text-stage-${stage.number}-name`}>
                  {stage.name}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-stage-${stage.number}-technical`}>
                  {stage.technical}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" data-testid={`text-stage-${stage.number}-description`}>
                {stage.description}
              </p>

              {/* Technical Details */}
              <div data-testid={`section-stage-${stage.number}-details`}>
                <p className="text-xs font-medium mb-3 text-foreground">Technical Implementation</p>
                <ul className="space-y-2">
                  {stage.details.map((detail, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed" data-testid={`text-stage-${stage.number}-detail-${i + 1}`}>
                      <span className="text-muted-foreground mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Visualization */}
            <div className="flex flex-col items-center justify-center" data-testid={`section-stage-${stage.number}-visualization`}>
              <div className="w-full flex items-center justify-center min-h-[280px] py-6">
                {stage.visualization}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => goToStage(currentStage - 1)}
            disabled={currentStage === 0}
            data-testid="button-prev-stage"
            className="text-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="text-xs font-mono text-muted-foreground">
            {currentStage + 1} / {stages.length}
          </div>

          <Button
            variant="ghost"
            onClick={() => goToStage(currentStage + 1)}
            disabled={currentStage === stages.length - 1}
            data-testid="button-next-stage"
            className="text-sm"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Minimap */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map((s, index) => (
            <button
              key={index}
              onClick={() => goToStage(index)}
              className={`p-3 rounded-lg border transition-all text-left hover-elevate ${
                index === currentStage
                  ? 'border-primary bg-primary/10 shadow-sm'
                  : 'border-border/50 bg-background/60 backdrop-blur-sm'
              }`}
              data-testid={`button-minimap-stage-${index + 1}`}
            >
              <div className={`text-2xl font-bold mb-1 ${
                index === currentStage ? 'text-primary' : 'text-primary/30'
              }`}>
                {s.number}
              </div>
              <div className="text-[10px] font-semibold line-clamp-2">{s.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
