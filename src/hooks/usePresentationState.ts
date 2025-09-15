import { useState } from 'react';
import { Slide, PresentationState } from '@/types/slideshow';

export function usePresentationState(slides: Slide[]) {
  const [state, setState] = useState<PresentationState>({
    currentSlideIndex: 0,
    showAnswer: false,
    responses: {},
    startTime: new Date(),
    isCompleted: false,
  });

  const nextSlide = () => {
    if (state.currentSlideIndex < slides.length - 1) {
      setState(prev => ({
        ...prev,
        currentSlideIndex: prev.currentSlideIndex + 1,
        showAnswer: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        isCompleted: true,
      }));
    }
  };

  const previousSlide = () => {
    if (state.currentSlideIndex > 0) {
      setState(prev => ({
        ...prev,
        currentSlideIndex: prev.currentSlideIndex - 1,
        showAnswer: false,
      }));
    }
  };

  const toggleAnswer = () => {
    setState(prev => ({
      ...prev,
      showAnswer: !prev.showAnswer,
    }));
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setState(prev => ({
        ...prev,
        currentSlideIndex: index,
        showAnswer: false,
      }));
    }
  };

  const recordResponse = (slideId: string, response: any) => {
    setState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [slideId]: response,
      },
    }));
  };

  const reset = () => {
    setState({
      currentSlideIndex: 0,
      showAnswer: false,
      responses: {},
      startTime: new Date(),
      isCompleted: false,
    });
  };

  const progress = slides.length > 0 ? ((state.currentSlideIndex + 1) / slides.length) * 100 : 0;

  return {
    currentSlideIndex: state.currentSlideIndex,
    showAnswer: state.showAnswer,
    responses: state.responses,
    startTime: state.startTime,
    isCompleted: state.isCompleted,
    progress,
    nextSlide,
    previousSlide,
    toggleAnswer,
    goToSlide,
    recordResponse,
    reset,
  };
}