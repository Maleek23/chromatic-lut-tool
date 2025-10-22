import { useState, useEffect } from 'react';

interface AnimatedUntitldProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function AnimatedUntitld({ 
  className = "", 
  autoPlay = false,
  interval = 3000 
}: AnimatedUntitldProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setIsCollapsed(prev => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsCollapsed(true)}
      onMouseLeave={() => setIsCollapsed(false)}
    >
      {/* UN text - gets sucked into the portal */}
      <span 
        className={`inline-block transition-all duration-700 ease-in-out ${
          isCollapsed 
            ? 'scale-0 -translate-x-4 rotate-180' 
            : 'scale-100 translate-x-0 rotate-0'
        }`}
        style={{ transformOrigin: 'right center' }}
      >
        UN
      </span>
      
      {/* The "/" portal - standalone gradient color with rotation */}
      <span 
        className={`inline-block font-semibold mx-0.5 relative z-10 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent transition-transform duration-700 ${
          isCollapsed ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
        }`}
      >
        /
      </span>
      
      {/* TITLD text - gets sucked into the portal */}
      <span 
        className={`inline-block transition-all duration-700 ease-in-out ${
          isCollapsed 
            ? 'scale-0 translate-x-4 -rotate-180' 
            : 'scale-100 translate-x-0 rotate-0'
        }`}
        style={{ transformOrigin: 'left center' }}
      >
        TITLD
      </span>
    </span>
  );
}
