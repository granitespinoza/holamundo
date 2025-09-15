import { useState, useCallback } from 'react';
import { Document } from '@/types/documents';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Texto sobre Reciclaje',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  const [activeDocumentId, setActiveDocumentId] = useState<string>('1');

  const activeDocument = documents.find(doc => doc.id === activeDocumentId);

  const createDocument = useCallback(() => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title: 'Nuevo documento',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDocuments(prev => [...prev, newDoc]);
    setActiveDocumentId(newDoc.id);
  }, []);

  const updateDocument = useCallback((id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, ...updates, updatedAt: new Date() }
        : doc
    ));
  }, []);

  const closeDocument = useCallback((id: string) => {
    setDocuments(prev => {
      const filtered = prev.filter(doc => doc.id !== id);
      if (filtered.length === 0) {
        // Always keep at least one document
        const newDoc: Document = {
          id: Date.now().toString(),
          title: 'Nuevo documento',
          content: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setActiveDocumentId(newDoc.id);
        return [newDoc];
      }
      if (activeDocumentId === id) {
        setActiveDocumentId(filtered[0].id);
      }
      return filtered;
    });
  }, [activeDocumentId]);

  const generateTitle = useCallback((content: string): string => {
    const firstLine = content.split('\n')[0].trim();
    if (firstLine.length > 0) {
      return firstLine.length > 30 ? firstLine.substring(0, 30) + '...' : firstLine;
    }
    return 'Documento sin título';
  }, []);

  return {
    documents,
    activeDocument,
    activeDocumentId,
    setActiveDocumentId,
    createDocument,
    updateDocument,
    closeDocument,
    generateTitle,
  };
}
