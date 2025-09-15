import { useState, useCallback, useMemo } from 'react';

export interface TextError {
  id: string;
  type: 'spelling' | 'grammar' | 'suggestion';
  text: string;
  start: number;
  end: number;
  message: string;
  suggestion?: string;
}

export interface AnalyzedText {
  original: string;
  errors: TextError[];
}

// Mock error detection - in a real app this would call an API
const detectErrors = (text: string): TextError[] => {
  const errors: TextError[] = [];
  
  // Simulated spelling errors
  const spellingPatterns = [
    { pattern: /\breciclar\b/gi, suggestion: 'reciclar', message: 'Error ortográfico detectado' },
    { pattern: /\bmedio ambiente\b/gi, suggestion: 'medioambiente', message: 'Se escribe junto' },
  ];
  
  // Simulated grammar errors
  const grammarPatterns = [
    { pattern: /\bde que\b/gi, suggestion: 'que', message: 'Posible dequeísmo' },
    { pattern: /\ba nivel de\b/gi, suggestion: 'en el ámbito de', message: 'Uso incorrecto de "a nivel de"' },
  ];
  
  // Simulated suggestions
  const suggestionPatterns = [
    { pattern: /\bpero\b/gi, suggestion: 'sin embargo', message: 'Podrías usar un conector más formal' },
    { pattern: /\bmuy\b/gi, suggestion: 'sumamente', message: 'Considera usar un adverbio más preciso' },
  ];
  
  const processPatterns = (patterns: any[], type: TextError['type']) => {
    patterns.forEach(({ pattern, suggestion, message }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        errors.push({
          id: `${type}-${match.index}`,
          type,
          text: match[0],
          start: match.index,
          end: match.index + match[0].length,
          message,
          suggestion,
        });
      }
    });
  };
  
  processPatterns(spellingPatterns, 'spelling');
  processPatterns(grammarPatterns, 'grammar');
  processPatterns(suggestionPatterns, 'suggestion');
  
  return errors.sort((a, b) => a.start - b.start);
};

export function useTextAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const analyzeText = useCallback(async (text: string): Promise<AnalyzedText> => {
    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const errors = detectErrors(text);
    setIsAnalyzing(false);
    
    return {
      original: text,
      errors,
    };
  }, []);
  
  const renderTextWithErrors = useCallback((analyzedText: AnalyzedText) => {
    const { original, errors } = analyzedText;
    
    if (errors.length === 0) {
      return original;
    }
    
    let result = '';
    let lastIndex = 0;
    
    errors.forEach((error) => {
      // Add text before the error
      result += original.slice(lastIndex, error.start);
      
      // Add the error with proper styling
      const errorClass = `error-${error.type}`;
      result += `<span class="${errorClass}" data-error-id="${error.id}" data-message="${error.message}" data-suggestion="${error.suggestion || ''}" title="${error.message}">${error.text}</span>`;
      
      lastIndex = error.end;
    });
    
    // Add remaining text
    result += original.slice(lastIndex);
    
    return result;
  }, []);
  
  return {
    analyzeText,
    renderTextWithErrors,
    isAnalyzing,
  };
}