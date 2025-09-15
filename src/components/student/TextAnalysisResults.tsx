import { Card, CardContent } from '@/components/ui/card';
import { analysisCards } from '@/data/additionalMockData';

interface TextAnalysisResultsProps {
  isVisible: boolean;
}

export function TextAnalysisResults({ isVisible }: TextAnalysisResultsProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">🔍 Análisis de tu Texto</h2>
        <p className="text-slate-300">Resultados del análisis con feedback personalizado</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysisCards.map((card, index) => (
          <Card 
            key={card.id}
            className={`bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 animate-in slide-in-from-left-8`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.color} bg-opacity-20 flex items-center justify-center text-2xl flex-shrink-0`}>
                  {card.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {card.content}
                  </p>
                  <div className="mt-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        card.type === 'positive'
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {card.type === 'positive' ? '✅ Fortaleza' : '🔄 Oportunidad'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}