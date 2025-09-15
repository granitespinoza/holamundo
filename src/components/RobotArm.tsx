interface RobotArmProps {
  side: 'left' | 'right';
  className?: string;
}

export function RobotArm({ side, className = "" }: RobotArmProps) {
  const isLeft = side === 'left';
  
  return (
    <div className={`absolute top-20 ${isLeft ? 'left-[-60px]' : 'right-[-60px]'} ${className}`}>
      {/* Upper arm */}
      <div 
        className={`w-16 h-6 bg-[hsl(var(--robot-cream))] border-4 border-[hsl(var(--robot-dark-blue))] rounded-full ${isLeft ? 'rotate-[-20deg]' : 'rotate-[20deg]'} origin-${isLeft ? 'right' : 'left'} mb-2`}
      />
      
      {/* Lower arm */}
      <div 
        className={`w-14 h-5 bg-[hsl(var(--robot-cream))] border-4 border-[hsl(var(--robot-dark-blue))] rounded-full ${isLeft ? 'rotate-[-10deg] ml-2' : 'rotate-[10deg] mr-2'}`}
      />
      
      {/* Hand */}
      <div 
        className={`w-8 h-8 bg-[hsl(var(--robot-cream))] border-4 border-[hsl(var(--robot-dark-blue))] rounded-full ${isLeft ? 'ml-6' : 'mr-6'} mt-1`}
      />
    </div>
  );
}