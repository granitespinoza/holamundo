import { useEffect, useRef, useState } from "react";

interface EyeProps {
  className?: string;
  isRightEye?: boolean;
  nervousness?: number; // 0-3 levels
}

export function Eye({ className = "", isRightEye = false, nervousness = 0 }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  // Set default positions based on the original design
  // The eye is 120x120, so center is at (60, 60)
  const defaultPosition = isRightEye 
    ? { x: 8, y: 8 } // Right eye pupil offset
    : { x: -8, y: -8 }; // Left eye pupil offset

  useEffect(() => {
    setPupilPosition({ x: defaultPosition.x, y: defaultPosition.y });
  }, [defaultPosition.x, defaultPosition.y]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      // Get eye position and dimensions
      const eye = eyeRef.current;
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      // Calculate direction vector from eye to mouse
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      
      // Calculate the distance from eye center to mouse
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate the eye radius and max pupil movement
      const eyeRadius = eyeRect.width / 2;
      const currentPupilRadius = pupilRadius;
      const maxMovement = eyeRadius - currentPupilRadius - 8; // Buffer to ensure pupil stays inside
      
      // If distance is very small, return to default position
      if (distance < 1) {
        setPupilPosition({ x: defaultPosition.x, y: defaultPosition.y });
        return;
      }
      
      // Normalize the direction vector
      let nx = dx / distance;
      let ny = dy / distance;
      
      // Apply the max movement constraint
      let moveX = Math.min(distance, maxMovement) * nx;
      let moveY = Math.min(distance, maxMovement) * ny;
      
      // Add the initial offset to maintain character
      moveX += defaultPosition.x;
      moveY += defaultPosition.y;
      
      // Additional constraint check to ensure pupil stays inside eye
      const totalDistance = Math.sqrt(
        Math.pow(moveX - defaultPosition.x, 2) + 
        Math.pow(moveY - defaultPosition.y, 2)
      );
      
      if (totalDistance > maxMovement) {
        const scale = maxMovement / totalDistance;
        moveX = defaultPosition.x + (moveX - defaultPosition.x) * scale;
        moveY = defaultPosition.y + (moveY - defaultPosition.y) * scale;
      }
      
      setPupilPosition({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [defaultPosition.x, defaultPosition.y]);

  // Eye size based on nervousness - using only valid Tailwind classes
  const getEyeSize = () => {
    switch (nervousness) {
      case 3: return { eye: 'w-32 h-32', pupil: 'w-10 h-10', radius: 22 };
      case 2: return { eye: 'w-32 h-32', pupil: 'w-9 h-9', radius: 20 };
      case 1: return { eye: 'w-28 h-28', pupil: 'w-8 h-8', radius: 18 };
      default: return { eye: 'w-24 h-24', pupil: 'w-7 h-7', radius: 16 };
    }
  };
  
  const { eye: eyeSize, pupil: pupilSize, radius: pupilRadius } = getEyeSize();

  return (
    <div
      ref={eyeRef}
      className={`relative ${eyeSize} rounded-full bg-[hsl(var(--robot-cream))] border-4 border-[hsl(var(--robot-dark-blue))] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Pupil */}
      <div 
        className={`absolute bg-black rounded-full ${pupilSize} transition-all duration-300`}
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
          transition: "transform 0.1s ease-out, width 0.3s ease-out, height 0.3s ease-out"
        }}
      />
    </div>
  );
}