import { useState } from 'react';

interface ColorCube3DProps {
  size?: number;
  rotating?: boolean;
}

export function ColorCube3D({ size = 200, rotating = true }: ColorCube3DProps) {
  const [rotation, setRotation] = useState({ x: 20, y: 45 });

  return (
    <div 
      className="relative inline-block cursor-grab active:cursor-grabbing"
      style={{ 
        width: size, 
        height: size,
        perspective: '1000px'
      }}
      onMouseMove={(e) => {
        if (e.buttons === 1) { // Left mouse button pressed
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientY - rect.top) / rect.height - 0.5) * 180;
          const y = ((e.clientX - rect.left) / rect.width - 0.5) * 180;
          setRotation({ x, y });
        }
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-100"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          animation: rotating ? 'rotate-cube 20s linear infinite' : 'none'
        }}
      >
        {/* Cube faces */}
        {[
          { name: 'front', color: 'from-red-500 to-yellow-500', transform: `translateZ(${size / 2}px)` },
          { name: 'back', color: 'from-primary to-chart-2', transform: `translateZ(-${size / 2}px) rotateY(180deg)` },
          { name: 'right', color: 'from-green-500 to-lime-500', transform: `rotateY(90deg) translateZ(${size / 2}px)` },
          { name: 'left', color: 'from-chart-2 to-chart-3', transform: `rotateY(-90deg) translateZ(${size / 2}px)` },
          { name: 'top', color: 'from-orange-500 to-red-500', transform: `rotateX(90deg) translateZ(${size / 2}px)` },
          { name: 'bottom', color: 'from-chart-3 to-primary', transform: `rotateX(-90deg) translateZ(${size / 2}px)` },
        ].map(({ name, color, transform }) => (
          <div
            key={name}
            className={`absolute w-full h-full bg-gradient-to-br ${color} opacity-70 border border-white/20 backdrop-blur-sm`}
            style={{
              transform,
              width: size,
              height: size
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-xs font-mono">
              {name}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes rotate-cube {
          from { transform: rotateX(20deg) rotateY(0deg); }
          to { transform: rotateX(20deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
