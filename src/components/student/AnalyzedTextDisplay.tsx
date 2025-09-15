import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTextAnalysis, type AnalyzedText, type TextError } from '@/hooks/useTextAnalysis';

interface AnalyzedTextDisplayProps {
  text: string;
  onErrorClick?: (error: TextError) => void;
}

export function AnalyzedTextDisplay({ text, onErrorClick }: AnalyzedTextDisplayProps) {
  const { analyzeText, renderTextWithErrors, isAnalyzing } = useTextAnalysis();
  const [analyzedText, setAnalyzedText] = useState<AnalyzedText | null>(null);
  
  useEffect(() => {
    if (text.trim()) {
      analyzeText(text).then(setAnalyzedText);
    }
  }, [text, analyzeText]);
  
  const handleErrorClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.hasAttribute('data-error-id')) {
      const errorId = target.getAttribute('data-error-id')!;
      const message = target.getAttribute('data-message')!;
      const suggestion = target.getAttribute('data-suggestion');
      
      const error: TextError = {
        id: errorId,
        type: errorId.split('-')[0] as TextError['type'],
        text: target.textContent || '',
        start: 0,
        end: 0,
        message,
        suggestion: suggestion || undefined,
      };
      
      onErrorClick?.(error);
    }
  };
  
  if (isAnalyzing) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              Analizando texto...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!analyzedText) {
    return null;
  }
  
  const { errors } = analyzedText;
  const spellingErrors = errors.filter(e => e.type === 'spelling');
  const grammarErrors = errors.filter(e => e.type === 'grammar');
  const suggestions = errors.filter(e => e.type === 'suggestion');
  
  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          🔍 Análisis de Texto
        </CardTitle>
        <div className="flex gap-2 mt-2">
          {spellingErrors.length > 0 && (
            <Badge className="bg-error-spelling/20 text-error-spelling border-error-spelling/30">
              {spellingErrors.length} errores ortográficos
            </Badge>
          )}
          {grammarErrors.length > 0 && (
            <Badge className="bg-error-grammar/20 text-error-grammar border-error-grammar/30">
              {grammarErrors.length} errores gramaticales
            </Badge>
          )}
          {suggestions.length > 0 && (
            <Badge className="bg-error-suggestion/20 text-error-suggestion border-error-suggestion/30">
              {suggestions.length} sugerencias
            </Badge>
          )}
          {errors.length === 0 && (
            <Badge className="bg-success-highlight/20 text-success-highlight border-success-highlight/30">
              ✅ Sin errores detectados
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="bg-white/5 p-4 rounded-lg leading-relaxed text-white cursor-pointer analyzed-text-content"
          onClick={handleErrorClick}
          dangerouslySetInnerHTML={{ 
            __html: renderTextWithErrors(analyzedText) 
          }}
        />
        
        <style>
          {`
          .analyzed-text-content .error-spelling {
            background-color: hsl(var(--error-spelling) / 0.2);
            border-bottom: 2px solid hsl(var(--error-spelling));
            cursor: help;
            border-radius: 2px;
          }
          .analyzed-text-content .error-grammar {
            background-color: hsl(var(--error-grammar) / 0.2);
            border-bottom: 2px solid hsl(var(--error-grammar));
            cursor: help;
            border-radius: 2px;
          }
          .analyzed-text-content .error-suggestion {
            background-color: hsl(var(--error-suggestion) / 0.2);
            border-bottom: 2px solid hsl(var(--error-suggestion));
            cursor: help;
            border-radius: 2px;
          }
          .analyzed-text-content .error-spelling:hover,
          .analyzed-text-content .error-grammar:hover,
          .analyzed-text-content .error-suggestion:hover {
            transform: translateY(-1px);
            transition: transform 0.2s ease;
          }
          `}
        </style>
      </CardContent>
    </Card>
  );
}