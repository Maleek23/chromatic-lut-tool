import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Loader2, 
  Scan, 
  Palette, 
  Sparkles, 
  Zap, 
  CheckCircle2,
  Image as ImageIcon,
  BarChart3,
  Wand2
} from "lucide-react";

interface AnalysisStage {
  id: string;
  label: string;
  icon: typeof Scan;
  duration: number;
  description: string;
}

const ANALYSIS_STAGES: AnalysisStage[] = [
  {
    id: "upload",
    label: "Processing Image",
    icon: ImageIcon,
    duration: 800,
    description: "Reading image data and validating format"
  },
  {
    id: "scan",
    label: "Scanning Pixels",
    icon: Scan,
    duration: 1200,
    description: "Analyzing 16.7 million color values"
  },
  {
    id: "extract",
    label: "Extracting Color Science",
    icon: Palette,
    duration: 1500,
    description: "Converting to ACEScg color space"
  },
  {
    id: "cluster",
    label: "Clustering Tones",
    icon: BarChart3,
    duration: 1000,
    description: "K-means clustering for dominant colors"
  },
  {
    id: "tonemap",
    label: "Building Tone Curves",
    icon: Sparkles,
    duration: 900,
    description: "Generating filmic tone mapping"
  },
  {
    id: "optimize",
    label: "Optimizing LUT",
    icon: Zap,
    duration: 700,
    description: "Gamut mapping and final adjustments"
  }
];

interface AnalysisProgressProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function AnalysisProgress({ isActive, onComplete }: AnalysisProgressProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentStageIndex(0);
      setProgress(0);
      setCompleted(false);
      return;
    }

    let stageTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runStages = async () => {
      for (let i = 0; i < ANALYSIS_STAGES.length; i++) {
        setCurrentStageIndex(i);
        const stage = ANALYSIS_STAGES[i];
        
        // Animate progress bar for this stage
        const startProgress = (i / ANALYSIS_STAGES.length) * 100;
        const endProgress = ((i + 1) / ANALYSIS_STAGES.length) * 100;
        const steps = 20;
        const stepDuration = stage.duration / steps;
        
        for (let step = 0; step <= steps; step++) {
          await new Promise(resolve => {
            progressInterval = setTimeout(() => {
              const stageProgress = (step / steps);
              setProgress(startProgress + (endProgress - startProgress) * stageProgress);
              resolve(null);
            }, stepDuration);
          });
        }
        
        // Small pause between stages
        await new Promise(resolve => {
          stageTimeout = setTimeout(resolve, 100);
        });
      }
      
      setCompleted(true);
      setProgress(100);
      
      // Wait a moment to show completion before calling onComplete
      setTimeout(() => {
        onComplete?.();
      }, 500);
    };

    runStages();

    return () => {
      clearTimeout(stageTimeout);
      clearTimeout(progressInterval);
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const currentStage = ANALYSIS_STAGES[currentStageIndex];

  return (
    <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 relative overflow-hidden">
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/20 border-2 border-primary/30">
              <Wand2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                {completed ? "Analysis Complete" : "Analyzing Image"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {completed ? "Professional color science extracted" : "Processing with cinema-grade algorithms"}
              </p>
            </div>
          </div>
          
          {completed && (
            <CheckCircle2 className="w-8 h-8 text-primary" />
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-1.5" data-testid="progress-analysis" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="font-mono">{Math.round(progress)}%</span>
            <span className="font-mono">
              {completed ? "Complete" : `Stage ${currentStageIndex + 1}/${ANALYSIS_STAGES.length}`}
            </span>
          </div>
        </div>

        {/* Current Stage */}
        {!completed && (
          <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="p-2 rounded-lg bg-primary/10">
              <currentStage.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{currentStage.label}</h4>
                <Loader2 className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{currentStage.description}</p>
            </div>
          </div>
        )}

        {/* All Stages Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ANALYSIS_STAGES.map((stage, index) => {
            const isComplete = index < currentStageIndex || completed;
            const isCurrent = index === currentStageIndex && !completed;
            const isPending = index > currentStageIndex && !completed;

            return (
              <div
                key={stage.id}
                className={`
                  flex items-center gap-2 p-3 rounded-lg transition-all duration-300
                  ${isComplete ? 'bg-primary/10 border border-primary/20' : ''}
                  ${isCurrent ? 'bg-primary/5 border-2 border-primary/30' : ''}
                  ${isPending ? 'bg-muted/30 opacity-50' : ''}
                `}
              >
                <div className={`p-1.5 rounded ${
                  isComplete ? 'bg-primary/20' : 
                  isCurrent ? 'bg-primary/10' : 
                  'bg-muted'
                }`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <stage.icon className={`w-4 h-4 ${
                      isCurrent ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  )}
                </div>
                <span className={`text-xs font-medium truncate ${
                  isComplete ? 'text-foreground' :
                  isCurrent ? 'text-primary font-semibold' :
                  'text-muted-foreground'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stage descriptions */}
        {!completed && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-muted/30">
            <Sparkles className="w-4 h-4 text-chart-2" />
            <p className="italic">
              {currentStageIndex === 0 && "Color grading used in Hollywood films takes hours. CHROMA does it in seconds."}
              {currentStageIndex === 1 && "Professional colorists spend years mastering these techniques."}
              {currentStageIndex === 2 && "ACEScg is the same color space used by Marvel Studios."}
              {currentStageIndex === 3 && "K-means clustering is the secret behind Netflix's color grading."}
              {currentStageIndex === 4 && "Filmic tone curves create that cinematic look you love."}
              {currentStageIndex === 5 && "Your LUT is now ready for professional color grading."}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
