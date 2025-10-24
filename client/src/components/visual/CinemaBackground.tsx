interface CinemaBackgroundProps {
  variant?: "default" | "subtle" | "vibrant";
}

export function CinemaBackground({ variant = "default" }: CinemaBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
    </div>
  );
}
