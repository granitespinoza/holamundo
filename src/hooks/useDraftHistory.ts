import { useState, useCallback, useRef, useEffect } from 'react';
import { Draft } from '@/types/documents';

const MAX_DRAFTS_PER_DOCUMENT = 10;

export function useDraftHistory(documentId: string) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const autoSaveTimer = useRef<NodeJS.Timeout>();

  // Load drafts for current document
  useEffect(() => {
    const storedDrafts = localStorage.getItem(`drafts_${documentId}`);
    if (storedDrafts) {
      try {
        const parsed = JSON.parse(storedDrafts);
        const validDrafts = parsed.map((draft: any) => ({
          ...draft,
          savedAt: new Date(draft.savedAt)
        }));
        setDrafts(validDrafts);
      } catch (error) {
        console.error('Error loading drafts:', error);
        setDrafts([]);
      }
    } else {
      setDrafts([]);
    }
  }, [documentId]);

  const saveDraft = useCallback((content: string) => {
    if (!content.trim()) return;

    const newDraft: Draft = {
      id: Date.now().toString(),
      documentId,
      content,
      savedAt: new Date(),
    };

    setDrafts(prev => {
      const updated = [newDraft, ...prev].slice(0, MAX_DRAFTS_PER_DOCUMENT);
      localStorage.setItem(`drafts_${documentId}`, JSON.stringify(updated));
      return updated;
    });
  }, [documentId]);

  const autoSaveDraft = useCallback((content: string) => {
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }
    
    autoSaveTimer.current = setTimeout(() => {
      saveDraft(content);
    }, 30000); // Auto-save every 30 seconds
  }, [saveDraft]);

  const loadDraft = useCallback((draftId: string) => {
    const draft = drafts.find(d => d.id === draftId);
    return draft?.content || '';
  }, [drafts]);

  const deleteDraft = useCallback((draftId: string) => {
    setDrafts(prev => {
      const filtered = prev.filter(d => d.id !== draftId);
      localStorage.setItem(`drafts_${documentId}`, JSON.stringify(filtered));
      return filtered;
    });
  }, [documentId]);

  const formatTimestamp = useCallback((date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    return date.toLocaleDateString();
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, []);

  return {
    drafts,
    saveDraft,
    autoSaveDraft,
    loadDraft,
    deleteDraft,
    formatTimestamp,
  };
}