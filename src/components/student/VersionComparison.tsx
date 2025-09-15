import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { previousTextVersion } from '@/data/additionalMockData';

interface VersionComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  currentText: string;
}

export function VersionComparison({ isOpen, onClose, currentText }: VersionComparisonProps) {
  const highlightDifferences = (oldText: string, newText: string) => {
    const oldWords = oldText.split(' ');
    const newWords = newText.split(' ');
    
    return {
      oldHighlighted: oldWords.map((word, index) => {
        const isRemoved = !newWords.includes(word) || newWords.indexOf(word) !== index;
        return {
          word,
          removed: isRemoved && !newWords.slice(Math.max(0, index - 2), index + 3).includes(word)
        };
      }),
      newHighlighted: newWords.map((word, index) => {
        const isAdded = !oldWords.includes(word) || oldWords.indexOf(word) !== index;
        return {
          word,
          added: isAdded && !oldWords.slice(Math.max(0, index - 2), index + 3).includes(word)
        };
      })
    };
  };

  const { oldHighlighted, newHighlighted } = highlightDifferences(previousTextVersion, currentText);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-md border-white/20 text-white max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            📚 Comparar Versiones
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Previous Version */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-white">Versión Anterior</h3>
              <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">v1.0</span>
            </div>
            <div className="bg-white/5 rounded-lg p-4 min-h-96 border border-white/10">
              <div className="text-sm text-slate-300 leading-relaxed">
                {oldHighlighted.map((item, index) => (
                  <span
                    key={index}
                    className={item.removed ? 'bg-red-500/20 text-red-300 line-through' : ''}
                  >
                    {item.word}{index < oldHighlighted.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Current Version */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-white">Versión Actual</h3>
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">v2.0</span>
            </div>
            <div className="bg-white/5 rounded-lg p-4 min-h-96 border border-white/10">
              <div className="text-sm text-slate-300 leading-relaxed">
                {newHighlighted.map((item, index) => (
                  <span
                    key={index}
                    className={item.added ? 'bg-green-500/20 text-green-300' : ''}
                  >
                    {item.word}{index < newHighlighted.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/20 border border-red-300 rounded"></div>
            <span className="text-sm text-slate-300">Texto eliminado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/20 border border-green-300 rounded"></div>
            <span className="text-sm text-slate-300">Texto añadido</span>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
          >
            Cerrar Comparación
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}