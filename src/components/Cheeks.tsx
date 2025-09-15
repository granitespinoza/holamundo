interface CheeksProps {
  nervousness: number; // 0-3 levels
}

export function Cheeks({ nervousness }: CheeksProps) {
  if (nervousness === 0) return null;

  const getBlushIntensity = () => {
    switch (nervousness) {
      case 3: return { opacity: 0.8, size: 'w-8 h-8', color: 'hsl(var(--robot-blush-intense))' };
      case 2: return { opacity: 0.6, size: 'w-7 h-7', color: 'hsl(var(--robot-blush-medium))' };
      case 1: return { opacity: 0.4, size: 'w-6 h-6', color: 'hsl(var(--robot-blush-light))' };
      default: return { opacity: 0, size: 'w-4 h-4', color: 'hsl(var(--robot-blush-light))' };
    }
  };

  const { opacity, size, color } = getBlushIntensity();

  return (
    <>
      {/* Left cheek - positioned in front */}
      <div 
        className={`absolute ${size} rounded-full transition-all duration-500 ease-out z-10`}
        style={{
          background: color,
          top: '50%',
          left: '12%',
          opacity: opacity,
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 15px ${color.replace(')', ' / 0.3)')}`,
        }}
      />
      {/* Right cheek - positioned in front */}
      <div 
        className={`absolute ${size} rounded-full transition-all duration-500 ease-out z-10`}
        style={{
          background: color,
          top: '50%',
          right: '12%',
          opacity: opacity,
          transform: 'translate(50%, -50%)',
          boxShadow: `0 0 15px ${color.replace(')', ' / 0.3)')}`,
        }}
      />
    </>
  );
}