import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { X, Check } from 'lucide-react';
import { useTextAnalysis, type AnalyzedText, type TextError } from '@/hooks/useTextAnalysis';
import { analysisCards } from '@/data/additionalMockData';
interface UnifiedAnalysisPanelProps {
  text: string;
  onClose: () => void;
}
type FilterType = 'all' | 'spelling' | 'grammar' | 'suggestions' | 'connectors';
export function UnifiedAnalysisPanel({
  text,
  onClose
}: UnifiedAnalysisPanelProps) {
  const {
    analyzeText,
    isAnalyzing
  } = useTextAnalysis();
  const [analyzedText, setAnalyzedText] = useState<AnalyzedText | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<Set<string>>(new Set());

  // Conectores que se resaltan en verde
  const connectors = ['En primer lugar', 'Además', 'Sin embargo', 'Por lo tanto', 'Por otro lado', 'También', 'Asimismo', 'No obstante', 'Por consiguiente', 'En consecuencia', 'Por ejemplo', 'Es decir', 'En resumen', 'Finalmente', 'Para concluir'];

  // Frases que necesitan mejora (del mock data)
  const improvementOpportunities = ['papel más importante', 'tirar basura', 'contaminar el planeta'];
  useEffect(() => {
    if (text.trim()) {
      analyzeText(text).then(setAnalyzedText);
    }
  }, [text, analyzeText]);
  const handleAcceptSuggestion = (suggestionId: string) => {
    setAcceptedSuggestions(prev => new Set([...prev, suggestionId]));
  };
  const renderHighlightedText = () => {
    if (!analyzedText) return text;
    let highlightedText = text;
    const {
      errors
    } = analyzedText;

    // Aplicar resaltados según el filtro activo
    if (activeFilter === 'all' || activeFilter === 'spelling') {
      const spellingErrors = errors.filter(e => e.type === 'spelling');
      spellingErrors.forEach((error, index) => {
        const errorId = `spelling-${index}`;
        const isAccepted = acceptedSuggestions.has(errorId);
        const highlightClass = isAccepted ? 'bg-success-highlight/20 text-success-highlight' : 'bg-error-spelling/30 text-error-spelling border-b-2 border-error-spelling';
        highlightedText = highlightedText.replace(error.text, `<span class="${highlightClass} px-1 rounded cursor-help" data-error-id="${errorId}" data-message="${error.message}" data-suggestion="${error.suggestion || ''}" data-type="spelling">${error.text}</span>`);
      });
    }
    if (activeFilter === 'all' || activeFilter === 'grammar') {
      const grammarErrors = errors.filter(e => e.type === 'grammar');
      grammarErrors.forEach((error, index) => {
        const errorId = `grammar-${index}`;
        const isAccepted = acceptedSuggestions.has(errorId);
        const highlightClass = isAccepted ? 'bg-success-highlight/20 text-success-highlight' : 'bg-error-grammar/30 text-error-grammar border-b-2 border-error-grammar';
        highlightedText = highlightedText.replace(error.text, `<span class="${highlightClass} px-1 rounded cursor-help" data-error-id="${errorId}" data-message="${error.message}" data-suggestion="${error.suggestion || ''}" data-type="grammar">${error.text}</span>`);
      });
    }
    if (activeFilter === 'all' || activeFilter === 'suggestions') {
      const suggestions = errors.filter(e => e.type === 'suggestion');
      suggestions.forEach((error, index) => {
        const errorId = `suggestion-${index}`;
        const isAccepted = acceptedSuggestions.has(errorId);
        const highlightClass = isAccepted ? 'bg-success-highlight/20 text-success-highlight' : 'bg-error-suggestion/30 text-error-suggestion border-b-2 border-error-suggestion';
        highlightedText = highlightedText.replace(error.text, `<span class="${highlightClass} px-1 rounded cursor-help" data-error-id="${errorId}" data-message="${error.message}" data-suggestion="${error.suggestion || ''}" data-type="suggestion">${error.text}</span>`);
      });

      // Resaltar oportunidades de mejora adicionales
      improvementOpportunities.forEach((phrase, index) => {
        const suggestionId = `improvement-${index}`;
        const isAccepted = acceptedSuggestions.has(suggestionId);
        const highlightClass = isAccepted ? 'bg-success-highlight/20 text-success-highlight' : 'bg-error-suggestion/30 text-error-suggestion border-b-2 border-error-suggestion';
        const regex = new RegExp(`(${phrase})`, 'gi');
        highlightedText = highlightedText.replace(regex, `<span class="${highlightClass} px-1 rounded cursor-help" data-error-id="${suggestionId}" data-message="Esta frase puede mejorarse para mayor claridad" data-suggestion="Considera usar un lenguaje más específico" data-type="suggestion">$1</span>`);
      });
    }
    if (activeFilter === 'all' || activeFilter === 'connectors') {
      // Resaltar conectores en verde
      connectors.forEach(connector => {
        const regex = new RegExp(`(${connector})`, 'gi');
        highlightedText = highlightedText.replace(regex, `<span class="bg-success-highlight/30 text-success-highlight px-1 rounded border-b-2 border-success-highlight" data-type="connector" data-message="¡Excelente uso de conector!">${connector}</span>`);
      });
    }
    return highlightedText;
  };
  const handleTextClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.hasAttribute('data-error-id')) {
      const errorId = target.getAttribute('data-error-id')!;
      const message = target.getAttribute('data-message')!;
      const suggestion = target.getAttribute('data-suggestion');
      const type = target.getAttribute('data-type')!;

      // Para mostrar tooltip - esto se manejará con el componente Tooltip
      console.log({
        errorId,
        message,
        suggestion,
        type
      });
    }
  };
  if (isAnalyzing) {
    return <div className="animate-in slide-in-from-right-5 duration-300">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
          <CardContent className="p-6 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-pulse text-muted-foreground text-lg mb-2">
                🤖 Analizando tu texto...
              </div>
              <div className="text-sm text-slate-400">
                Esto tomará solo unos segundos
              </div>
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  if (!analyzedText) return null;
  const {
    errors
  } = analyzedText;
  const spellingErrors = errors.filter(e => e.type === 'spelling');
  const grammarErrors = errors.filter(e => e.type === 'grammar');
  const suggestions = errors.filter(e => e.type === 'suggestion') || [];
  const connectorsCount = (text.match(new RegExp(connectors.join('|'), 'gi')) || []).length;
  const getFilterCount = (filter: FilterType) => {
    switch (filter) {
      case 'spelling':
        return spellingErrors.length;
      case 'grammar':
        return grammarErrors.length;
      case 'suggestions':
        return suggestions.length + improvementOpportunities.length;
      case 'connectors':
        return connectorsCount;
      default:
        return 0;
    }
  };
  return <TooltipProvider>
      <div className="animate-in slide-in-from-right-5 duration-300">
        <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-white text-lg flex items-center gap-2">🔍 Sugerencia IA</CardTitle>
            <Button onClick={onClose} variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/10 p-2">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Filtros Interactivos */}
            <div className="space-y-3">
              <h3 className="text-white font-medium text-sm">Filtrar feedback:</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant={activeFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('all')} className="text-xs h-8">
                  Todos
                </Button>
                
                {spellingErrors.length > 0 && <Button variant={activeFilter === 'spelling' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('spelling')} className="text-xs h-8 bg-error-spelling/20 text-error-spelling border-error-spelling/30 hover:bg-error-spelling/30">
                    {getFilterCount('spelling')} Errores ortográficos
                  </Button>}
                
                {grammarErrors.length > 0 && <Button variant={activeFilter === 'grammar' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('grammar')} className="text-xs h-8 bg-error-grammar/20 text-error-grammar border-error-grammar/30 hover:bg-error-grammar/30">
                    {getFilterCount('grammar')} Errores gramaticales
                  </Button>}
                
                {(suggestions.length > 0 || improvementOpportunities.length > 0) && <Button variant={activeFilter === 'suggestions' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('suggestions')} className="text-xs h-8 bg-error-suggestion/20 text-error-suggestion border-error-suggestion/30 hover:bg-error-suggestion/30">
                    {getFilterCount('suggestions')} Sugerencias
                  </Button>}
                
                {connectorsCount > 0 && <Button variant={activeFilter === 'connectors' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilter('connectors')} className="text-xs h-8 bg-success-highlight/20 text-success-highlight border-success-highlight/30 hover:bg-success-highlight/30">
                    {getFilterCount('connectors')} Aciertos
                  </Button>}
              </div>
            </div>

            {/* Texto Analizado */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-h-96 overflow-y-auto">
              <div className="text-slate-200 leading-relaxed text-sm whitespace-pre-wrap cursor-pointer" onClick={handleTextClick} dangerouslySetInnerHTML={{
              __html: renderHighlightedText()
            }} />
            </div>

            {/* Conclusión del Análisis */}
            <div className="space-y-3">
              <h3 className="text-white font-medium flex items-center gap-2">
                📊 Conclusión del Análisis
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {analysisCards.slice(0, 2).map(card => <div key={card.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${card.color} bg-opacity-20 flex items-center justify-center text-sm flex-shrink-0`}>
                        {card.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm mb-1">
                          {card.title}
                        </h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {card.content}
                        </p>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>

            {/* Leyenda y Consejo */}
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <p className="text-blue-300 text-sm">
                💡 <strong>Código de colores:</strong> 
                <span className="text-error-spelling"> Rojo</span> = errores objetivos, 
                <span className="text-error-suggestion"> Amarillo</span> = sugerencias de mejora,
                <span className="text-success-highlight"> Verde</span> = aciertos destacables.
                Haz clic en cualquier elemento resaltado para ver más detalles.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>
        {`
        .analyzed-text-content .error-spelling:hover,
        .analyzed-text-content .error-grammar:hover,
        .analyzed-text-content .error-suggestion:hover,
        .analyzed-text-content [data-type="connector"]:hover {
          transform: translateY(-1px);
          transition: transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        `}
      </style>
    </TooltipProvider>;
}