import { useState, useEffect } from "react";
import { Eye } from "./Eye";
import { RobotArm } from "./RobotArm";
import { Cheeks } from "./Cheeks";

export function Robot() {
  const [nervousness, setNervousness] = useState(0);
  const [isHoveringBelly, setIsHoveringBelly] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isHoveringBelly && nervousness < 3) {
      // Gradually increase nervousness while hovering
      timer = setTimeout(() => {
        setNervousness(prev => Math.min(prev + 1, 3));
      }, nervousness === 0 ? 1000 : nervousness === 1 ? 800 : 600);
    } else if (!isHoveringBelly && nervousness > 0) {
      // Gradually decrease nervousness when not hovering with debounce
      timer = setTimeout(() => {
        setNervousness(prev => Math.max(prev - 1, 0));
      }, 800);
    }

    return () => clearTimeout(timer);
  }, [isHoveringBelly, nervousness]);

  // Animation classes based on nervousness - use simple animations  
  const getAnimationClasses = () => {
    if (nervousness === 3) return 'animate-pulse';
    if (nervousness === 2) return 'animate-bounce';
    if (nervousness === 1) return 'animate-pulse';
    return '';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
      <div className={`relative ${getAnimationClasses()}`}>
        {/* Robot Arms */}
        <RobotArm side="left" />
        <RobotArm side="right" />
        
        {/* Robot Body Container */}
        <div className="relative">
          {/* Head */}
          <div className="w-80 h-48 bg-[hsl(var(--robot-cream))] border-8 border-[hsl(var(--robot-dark-blue))] rounded-t-3xl relative shadow-lg">
            {/* Cheeks */}
            <Cheeks nervousness={nervousness} />
            {/* Antennae/Ears */}
            <div className="absolute top-[-20px] left-8 w-6 h-12 bg-[hsl(var(--robot-cream))] border-4 border-[hsl(var(--robot-dark-blue))] rounded-full" />
            <div className="absolute top-[-20px] right-8 w-6 h-12 bg-[hsl(var(--robot-cream))] border-4 border-[hsl(var(--robot-dark-blue))] rounded-full" />
            
            {/* Eyes Container */}
            <div className="flex justify-center items-center gap-8 pt-12">
              <Eye isRightEye={false} nervousness={nervousness} />
              <Eye isRightEye={true} nervousness={nervousness} />
            </div>
          </div>
          
          {/* Body */}
          <div 
            className="w-80 h-40 bg-[hsl(var(--robot-cream))] border-8 border-t-0 border-[hsl(var(--robot-dark-blue))] rounded-b-3xl shadow-lg relative cursor-pointer"
            onMouseEnter={() => setIsHoveringBelly(true)}
            onMouseLeave={() => setIsHoveringBelly(false)}
            title="¡Hazle cosquillas en la barriga!"
          >
            {/* Invisible belly tickle area */}
            <div className="absolute inset-0 z-10" />
            {/* Chest Panel */}
            <div className="flex justify-center pt-6">
              <div className="w-24 h-16 bg-[hsl(var(--robot-blue))] border-4 border-[hsl(var(--robot-dark-blue))] rounded-lg">
                {/* Control buttons */}
                <div className="flex justify-center items-center gap-2 pt-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-[hsl(var(--robot-dark-blue))]" />
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-[hsl(var(--robot-dark-blue))]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Shadow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-60 h-8 bg-[hsl(var(--robot-shadow)/0.3)] rounded-full blur-sm" />
        </div>
      </div>
    </div>
  );
}