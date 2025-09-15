import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dailyChallengeData } from '@/data/additionalMockData';
import { useToast } from '@/hooks/use-toast';

interface DailyChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function DailyChallenge({ isOpen, onClose, onComplete }: DailyChallengeProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedOption === null) {
      toast({
        title: "Selecciona una respuesta",
        description: "Por favor, elige una opción antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    setShowResult(true);
  };

  const handleComplete = () => {
    const isCorrect = dailyChallengeData.options[selectedOption!].correct;
    
    if (isCorrect) {
      onComplete();
      toast({
        title: "¡Excelente!",
        description: `Has ganado ${dailyChallengeData.points} puntos. ¡Sigue así!`,
      });
    }
    
    onClose();
    setSelectedOption(null);
    setShowResult(false);
  };

  const resetChallenge = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-md border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            🎮 {dailyChallengeData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          
          {/* Challenge Question */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-yellow-500/20 text-yellow-300">
                  +{dailyChallengeData.points} puntos
                </Badge>
              </div>
              <p className="text-lg text-white leading-relaxed">
                {dailyChallengeData.question}
              </p>
            </CardContent>
          </Card>
          
          {/* Options */}
          <div className="space-y-3">
            {dailyChallengeData.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => !showResult && setSelectedOption(index)}
                disabled={showResult}
                variant={
                  showResult
                    ? option.correct
                      ? "default"
                      : selectedOption === index
                      ? "destructive"
                      : "ghost"
                    : selectedOption === index
                    ? "default"
                    : "ghost"
                }
                className={`w-full justify-start p-4 h-auto ${
                  showResult && option.correct
                    ? 'bg-green-500/20 text-green-300 border-green-500/50'
                    : showResult && selectedOption === index && !option.correct
                    ? 'bg-red-500/20 text-red-300 border-red-500/50'
                    : selectedOption === index && !showResult
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{option.text}</div>
                  {showResult && (
                    <div className="text-sm mt-1 opacity-80">
                      {option.explanation}
                    </div>
                  )}
                </div>
                {showResult && option.correct && (
                  <span className="ml-auto">✅</span>
                )}
                {showResult && selectedOption === index && !option.correct && (
                  <span className="ml-auto">❌</span>
                )}
              </Button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {!showResult ? (
              <>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  disabled={selectedOption === null}
                >
                  Responder
                </Button>
              </>
            ) : (
              <div className="flex gap-2 w-full">
                <Button
                  onClick={resetChallenge}
                  variant="outline"
                  className="flex-1 bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Intentar de nuevo
                </Button>
                <Button
                  onClick={handleComplete}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                >
                  Continuar
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}