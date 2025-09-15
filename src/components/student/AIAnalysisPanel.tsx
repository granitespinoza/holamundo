import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface AIAnalysisPanelProps {
  text: string;
  onClose: () => void;
}

export function AIAnalysisPanel({ text, onClose }: AIAnalysisPanelProps) {
  // Define conectores that should be highlighted in green
  const connectors = [
    'En primer lugar', 'Además', 'Sin embargo', 'Por lo tanto', 'Por otro lado',
    'También', 'Asimismo', 'No obstante', 'Por consiguiente', 'En consecuencia',
    'Por ejemplo', 'Es decir', 'En resumen', 'Finalmente', 'Para concluir'
  ];

  // Define phrases that need improvement (from mock data)
  const improvementOpportunities = [
    'papel más importante',
    'tirar basura',
    'contaminar el planeta'
  ];

  const highlightText = (text: string) => {
    let highlightedText = text;
    
    // Highlight connectors in green
    connectors.forEach(connector => {
      const regex = new RegExp(`(${connector})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="bg-green-500/30 text-green-300 px-1 rounded border-b-2 border-green-400">$1</span>`);
    });
    
    // Highlight improvement opportunities in yellow
    improvementOpportunities.forEach(phrase => {
      const regex = new RegExp(`(${phrase})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="bg-yellow-500/30 text-yellow-300 px-1 rounded border-b-2 border-yellow-400 cursor-help" title="Esta frase puede mejorarse para mayor claridad">$1</span>`);
    });
    
    return highlightedText;
  };

  return (
    <div className="animate-in slide-in-from-right-5 duration-300">
      <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            🤖 Sugerencia IA
          </CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white hover:bg-white/10 p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-green-500/20 text-green-300 text-xs">
                ✅ Conectores bien usados
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 text-xs">
                🔄 Oportunidades de mejora
              </Badge>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 max-h-96 overflow-y-auto">
            <div 
              className="text-slate-200 leading-relaxed text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightText(text) }}
            />
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-300 text-sm">
              💡 <strong>Consejo:</strong> Los elementos resaltados en verde están bien utilizados. 
              Los amarillos pueden mejorarse para mayor claridad y fluidez.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}