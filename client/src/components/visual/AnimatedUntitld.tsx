import { useState, useEffect } from 'react';

interface AnimatedUntitldProps {
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

export function AnimatedUntitld({ 
  className = "", 
  autoPlay = true,
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
      onMouseEnter={() => !autoPlay && setIsCollapsed(true)}
      onMouseLeave={() => !autoPlay && setIsCollapsed(false)}
    >
      {/* UN text - slides left and scales down */}
      <span 
        className={`inline-block transition-all duration-700 ease-in-out ${
          isCollapsed 
            ? 'opacity-0 scale-0 -translate-x-2' 
            : 'opacity-100 scale-100 translate-x-0'
        }`}
      >
        UN
      </span>
      
      {/* The "/" portal - always visible */}
      <span className="inline-block font-semibold mx-0.5 relative z-10">
        /
      </span>
      
      {/* TITLD text - slides right and scales down */}
      <span 
        className={`inline-block transition-all duration-700 ease-in-out ${
          isCollapsed 
            ? 'opacity-0 scale-0 translate-x-2' 
            : 'opacity-100 scale-100 translate-x-0'
        }`}
      >
        TITLD
      </span>
    </span>
  );
}
