import { useState } from 'react';
import { Slideshow, SkillType, Slide } from '@/types/slideshow';
import { generateMockSlides } from '@/utils/slideshowGenerator';

interface GenerateParams {
  sourceType: 'pdf' | 'text';
  sourceContent: string;
  skills: SkillType[];
  questionCount: number;
}

export function useSlideshowGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [slideshows, setSlideshows] = useState<Slideshow[]>([]);

  const generateSlideshow = async (params: GenerateParams): Promise<string> => {
    setIsGenerating(true);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      const slides = generateMockSlides(params);
      
      const slideshow: Slideshow = {
        id: `slideshow-${Date.now()}`,
        title: `Cuestionario - ${new Date().toLocaleDateString()}`,
        slides,
        createdBy: 'teacher-1',
        createdAt: new Date(),
        settings: {
          skills: params.skills,
          sourceType: params.sourceType,
          sourceContent: params.sourceContent,
          questionCount: params.questionCount,
        },
      };

      setSlideshows(prev => [...prev, slideshow]);
      
      // Store in localStorage for persistence
      const existingSlideshows = JSON.parse(localStorage.getItem('slideshows') || '[]');
      localStorage.setItem('slideshows', JSON.stringify([...existingSlideshows, slideshow]));

      return slideshow.id;
    } finally {
      setIsGenerating(false);
    }
  };

  const getSlideshow = (id: string): Slideshow | undefined => {
    const stored = JSON.parse(localStorage.getItem('slideshows') || '[]');
    const slideshow = stored.find((s: Slideshow) => s.id === id);
    if (slideshow) {
      // Convert createdAt back to Date object if it's a string
      slideshow.createdAt = new Date(slideshow.createdAt);
    }
    return slideshow;
  };

  const updateSlideshow = (id: string, updates: Partial<Slideshow>) => {
    const stored = JSON.parse(localStorage.getItem('slideshows') || '[]');
    const updated = stored.map((s: Slideshow) => {
      if (s.id === id) {
        const updatedSlideshow = { ...s, ...updates };
        // Ensure createdAt remains a Date object
        updatedSlideshow.createdAt = new Date(s.createdAt);
        return updatedSlideshow;
      }
      // Convert createdAt back to Date object for other slideshows too
      s.createdAt = new Date(s.createdAt);
      return s;
    });
    localStorage.setItem('slideshows', JSON.stringify(updated));
    setSlideshows(updated);
  };

  const deleteSlide = (slideshowId: string, slideId: string) => {
    const slideshow = getSlideshow(slideshowId);
    if (!slideshow) return;

    const updatedSlides = slideshow.slides.filter(slide => slide.id !== slideId);
    updateSlideshow(slideshowId, { slides: updatedSlides });
  };

  const updateSlide = (slideshowId: string, slideId: string, updates: Partial<Slide>) => {
    const slideshow = getSlideshow(slideshowId);
    if (!slideshow) return;

    const updatedSlides = slideshow.slides.map(slide =>
      slide.id === slideId ? { ...slide, ...updates } : slide
    );
    updateSlideshow(slideshowId, { slides: updatedSlides });
  };

  const reorderSlides = (slideshowId: string, fromIndex: number, toIndex: number) => {
    const slideshow = getSlideshow(slideshowId);
    if (!slideshow) return;

    const slides = [...slideshow.slides];
    const [removed] = slides.splice(fromIndex, 1);
    slides.splice(toIndex, 0, removed);

    updateSlideshow(slideshowId, { slides });
  };

  return {
    isGenerating,
    slideshows,
    generateSlideshow,
    getSlideshow,
    updateSlideshow,
    deleteSlide,
    updateSlide,
    reorderSlides,
  };
}