interface CinemaBackgroundProps {
  variant?: "default" | "subtle" | "vibrant";
}

export function CinemaBackground({ variant = "default" }: CinemaBackgroundProps) {
  const orbs = {
    default: {
      orb1: { size: "w-[600px] h-[600px]", color: "bg-chart-2/20", position: "top-1/4 right-1/3", duration: "4s" },
      orb2: { size: "w-[500px] h-[500px]", color: "bg-primary/15", position: "bottom-1/4 left-1/4", duration: "5s", delay: "1s" },
    },
    subtle: {
      orb1: { size: "w-[400px] h-[400px]", color: "bg-chart-2/10", position: "top-1/4 right-1/3", duration: "5s" },
      orb2: { size: "w-[350px] h-[350px]", color: "bg-primary/8", position: "bottom-1/4 left-1/4", duration: "6s", delay: "1s" },
    },
    vibrant: {
      orb1: { size: "w-[700px] h-[700px]", color: "bg-chart-2/25", position: "top-1/4 right-1/3", duration: "4s" },
      orb2: { size: "w-[600px] h-[600px]", color: "bg-primary/20", position: "bottom-1/4 left-1/4", duration: "5s", delay: "1s" },
      orb3: { size: "w-[400px] h-[400px]", color: "bg-chart-3/15", position: "top-1/2 left-1/2", duration: "7s", delay: "2s" },
    },
  };

  const selectedOrbs = orbs[variant];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated color orb 1 */}
      <div 
        className={`absolute ${selectedOrbs.orb1.position} ${selectedOrbs.orb1.size} ${selectedOrbs.orb1.color} rounded-full blur-3xl animate-pulse`}
        style={{ animationDuration: selectedOrbs.orb1.duration }}
      />
      
      {/* Animated color orb 2 */}
      <div 
        className={`absolute ${selectedOrbs.orb2.position} ${selectedOrbs.orb2.size} ${selectedOrbs.orb2.color} rounded-full blur-3xl animate-pulse`}
        style={{ animationDuration: selectedOrbs.orb2.duration, animationDelay: selectedOrbs.orb2.delay }}
      />
      
      {/* Optional third orb for vibrant variant */}
      {variant === "vibrant" && 'orb3' in selectedOrbs && (
        <div 
          className={`absolute ${selectedOrbs.orb3.position} ${selectedOrbs.orb3.size} ${selectedOrbs.orb3.color} rounded-full blur-3xl animate-pulse`}
          style={{ animationDuration: selectedOrbs.orb3.duration, animationDelay: selectedOrbs.orb3.delay }}
        />
      )}
    </div>
  );
}
