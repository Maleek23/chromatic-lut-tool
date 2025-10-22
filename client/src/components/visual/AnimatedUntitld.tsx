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
      className={`inline-flex items-center relative ${className}`}
      onMouseEnter={() => setIsCollapsed(prev => !prev)}
    >
      {/* UN text - slides into the slash from the left */}
      <span 
        className={`inline-block transition-all duration-700 ease-in-out ${
          isCollapsed 
            ? 'opacity-0 scale-50 translate-x-4' 
            : 'opacity-100 scale-100 translate-x-0'
        }`}
        style={{ 
          transformOrigin: 'center right',
          whiteSpace: 'nowrap'
        }}
      >
        UN
      </span>
      
      {/* The "/" portal - standalone gradient color with pulse effect */}
      <span 
        className={`inline-block font-semibold mx-1 relative z-10 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent transition-all duration-700 ${
          isCollapsed ? 'scale-125' : 'scale-100'
        }`}
      >
        /
      </span>
      
      {/* TITLD text - slides into the slash from the right */}
      <span 
        className={`inline-block transition-all duration-700 ease-in-out ${
          isCollapsed 
            ? 'opacity-0 scale-50 -translate-x-4' 
            : 'opacity-100 scale-100 translate-x-0'
        }`}
        style={{ 
          transformOrigin: 'center left',
          whiteSpace: 'nowrap'
        }}
      >
        TITLD
      </span>
    </span>
  );
}
