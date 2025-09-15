export function BrandingSection() {
  return (
    <div className="text-center space-y-6 max-w-2xl">
      {/* Main Title */}
      <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Desbloquea tu Potencial como Escritor
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
        Tu tutor personal con IA para planificar, redactar y perfeccionar cada uno de tus textos.
      </p>
      
      {/* Feature highlights */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-cyan-300 text-sm font-medium">
          📝 Planificación Guiada
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-purple-300 text-sm font-medium">
          🔗 Asistente de Conectores
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-pink-300 text-sm font-medium">
          🎯 Revisión Inteligente
        </div>
      </div>
    </div>
  );
}