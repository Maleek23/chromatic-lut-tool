export function FilmGrain({ opacity = 0.03, animate = true }: { opacity?: number; animate?: boolean }) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity }}>
        <filter id="film-grain">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.9" 
            numOctaves="4" 
            stitchTiles="stitch"
          >
            {animate && (
              <animate
                attributeName="baseFrequency"
                dur="0.3s"
                values="0.9;0.92;0.9"
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </>
  );
}
