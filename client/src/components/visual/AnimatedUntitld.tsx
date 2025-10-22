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
      className={`inline-flex items-center ${className}`}
      onMouseEnter={() => setIsCollapsed(true)}
    >
      {/* UN text - gets sucked horizontally into the slash from the left */}
      <span 
        className={`inline-block transition-all duration-500 ease-in-out overflow-hidden ${
          isCollapsed 
            ? 'w-0 opacity-0 translate-x-2' 
            : 'w-auto opacity-100 translate-x-0'
        }`}
      >
        UN
      </span>
      
      {/* The "/" portal - standalone gradient color */}
      <span 
        className="inline-block font-semibold mx-0.5 relative z-10 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent"
      >
        /
      </span>
      
      {/* TITLD text - gets sucked horizontally into the slash from the right */}
      <span 
        className={`inline-block transition-all duration-500 ease-in-out overflow-hidden ${
          isCollapsed 
            ? 'w-0 opacity-0 -translate-x-2' 
            : 'w-auto opacity-100 translate-x-0'
        }`}
      >
        TITLD
      </span>
    </span>
  );
}
