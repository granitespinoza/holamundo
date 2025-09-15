import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { connectorsData } from '@/data/additionalMockData';

interface ConnectorsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertConnector: (connector: string) => void;
}

export function ConnectorsPanel({ isOpen, onClose, onInsertConnector }: ConnectorsPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof connectorsData>('sequence');

  const categories = [
    { key: 'sequence' as const, label: 'Secuencia', icon: '1️⃣' },
    { key: 'addition' as const, label: 'Adición', icon: '➕' },
    { key: 'contrast' as const, label: 'Contraste', icon: '⚡' },
    { key: 'causeEffect' as const, label: 'Causa-Efecto', icon: '🔄' },
    { key: 'example' as const, label: 'Ejemplo', icon: '💡' },
    { key: 'conclusion' as const, label: 'Conclusión', icon: '🎯' }
  ];

  const handleInsertConnector = (connector: string) => {
    onInsertConnector(connector);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-md border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            🔗 Asistente de Conectores
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Categorías</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  variant={selectedCategory === category.key ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    selectedCategory === category.key
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Connectors */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              {categories.find(c => c.key === selectedCategory)?.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {connectorsData[selectedCategory].map((connector, index) => (
                <Badge
                  key={index}
                  onClick={() => handleInsertConnector(connector)}
                  className="cursor-pointer bg-white/10 text-white hover:bg-white/20 transition-colors px-3 py-2"
                >
                  {connector}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-slate-300">
                💡 <strong>Tip:</strong> Haz clic en cualquier conector para insertarlo en tu texto.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}