interface SpectrumLoaderProps {
  progress?: number;
  height?: number;
  showPercentage?: boolean;
}

export function SpectrumLoader({ 
  progress = 0, 
  height = 4,
  showPercentage = false 
}: SpectrumLoaderProps) {
  return (
    <div className="relative w-full">
      <div 
        className="w-full rounded-full overflow-hidden bg-muted"
        style={{ height }}
      >
        <div
          className="h-full bg-gradient-to-r from-primary via-chart-2 to-chart-3 transition-all duration-300 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          {/* Animated shine effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite'
            }}
          />
        </div>
      </div>
      
      {showPercentage && (
        <div className="mt-2 text-sm text-muted-foreground text-center font-mono">
          {Math.round(progress)}%
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
