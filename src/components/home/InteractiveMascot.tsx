import { useState, useEffect, useRef } from "react";

interface EyeProps {
  isRightEye?: boolean;
  className?: string;
}

function Eye({ isRightEye = false, className = "" }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  const defaultPosition = {
    x: isRightEye ? 2 : -2,
    y: 0
  };

  useEffect(() => {
    setPupilPosition(defaultPosition);
  }, [defaultPosition.x, defaultPosition.y]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!eyeRef.current) return;

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const deltaX = event.clientX - eyeCenterX;
      const deltaY = event.clientY - eyeCenterY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxMovement = 16;
      
      if (distance > 0) {
        const limitedX = (deltaX / distance) * Math.min(distance, maxMovement);
        const limitedY = (deltaY / distance) * Math.min(distance, maxMovement);
        
        setPupilPosition({ x: limitedX, y: limitedY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={eyeRef}
      className={`w-24 h-24 bg-white border-4 border-cyan-400 rounded-full relative shadow-lg shadow-cyan-400/20 ${className}`}
    >
      <div 
        className="w-8 h-8 bg-slate-900 rounded-full absolute top-1/2 left-1/2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(calc(-50% + ${pupilPosition.x}px), calc(-50% + ${pupilPosition.y}px))`
        }}
      />
    </div>
  );
}

export function InteractiveMascot() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`transition-transform duration-300 ${isHovering ? 'scale-105' : 'scale-100'}`}>
        
        {/* Robot Body Container */}
        <div className="relative">
          {/* Head */}
          <div className="w-64 h-40 bg-gradient-to-b from-slate-100 to-slate-200 border-4 border-cyan-400 rounded-t-3xl relative shadow-xl shadow-cyan-400/20">
            
            {/* Antennae */}
            <div className="absolute top-[-16px] left-6 w-4 h-10 bg-gradient-to-t from-slate-200 to-cyan-300 border-2 border-cyan-400 rounded-full shadow-lg" />
            <div className="absolute top-[-16px] right-6 w-4 h-10 bg-gradient-to-t from-slate-200 to-cyan-300 border-2 border-cyan-400 rounded-full shadow-lg" />
            
            {/* Eyes Container */}
            <div className="flex justify-center items-center gap-6 pt-8">
              <Eye isRightEye={false} />
              <Eye isRightEye={true} />
            </div>

            {/* Cheeks - only show when hovering */}
            {isHovering && (
              <>
                <div 
                  className="absolute w-6 h-6 rounded-full transition-all duration-500 ease-out z-10 animate-pulse"
                  style={{
                    background: 'hsl(340 100% 70%)',
                    top: '60%',
                    left: '15%',
                    opacity: 0.7,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 15px hsl(340 100% 70% / 0.4)',
                  }}
                />
                <div 
                  className="absolute w-6 h-6 rounded-full transition-all duration-500 ease-out z-10 animate-pulse"
                  style={{
                    background: 'hsl(340 100% 70%)',
                    top: '60%',
                    right: '15%',
                    opacity: 0.7,
                    transform: 'translate(50%, -50%)',
                    boxShadow: '0 0 15px hsl(340 100% 70% / 0.4)',
                  }}
                />
              </>
            )}
          </div>
          
          {/* Body */}
          <div className="w-64 h-32 bg-gradient-to-b from-slate-100 to-slate-200 border-4 border-t-0 border-cyan-400 rounded-b-3xl shadow-xl shadow-cyan-400/20 relative">
            {/* Chest Panel */}
            <div className="flex justify-center pt-4">
              <div className="w-20 h-12 bg-gradient-to-b from-purple-400 to-purple-500 border-2 border-purple-600 rounded-lg shadow-lg">
                {/* Control buttons */}
                <div className="flex justify-center items-center gap-2 pt-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full border border-red-600 shadow-sm" />
                  <div className="w-3 h-3 bg-green-400 rounded-full border border-green-600 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl -z-10" />
        </div>

        {/* Floating animation particles */}
        {isHovering && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
            <div className="absolute bottom-12 left-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
          </div>
        )}
      </div>
      
      {/* Helpful text */}
      <div className="text-center mt-4">
        <p className="text-slate-300 text-sm">¡Hola! Soy tu asistente de escritura ✨</p>
      </div>
    </div>
  );
}