import { Button } from '@/components/ui/button';
import { Document } from '@/types/documents';
import { X, Plus, FileText } from 'lucide-react';

interface DocumentTabsProps {
  documents: Document[];
  activeDocumentId: string;
  onTabSelect: (id: string) => void;
  onTabClose: (id: string) => void;
  onCreateNew: () => void;
  generateTitle: (content: string) => string;
}

export function DocumentTabs({ 
  documents, 
  activeDocumentId, 
  onTabSelect, 
  onTabClose, 
  onCreateNew,
  generateTitle 
}: DocumentTabsProps) {
  return (
    <div className="flex items-center gap-1 mb-4 overflow-x-auto">
      {documents.map((doc) => {
        const title = doc.title !== 'Nuevo documento' ? doc.title : generateTitle(doc.content);
        const hasUnsavedChanges = false; // TODO: Implement unsaved changes detection
        
        return (
          <div
            key={doc.id}
            className={`group flex items-center gap-2 px-3 py-2 rounded-t-md border-b-2 transition-all ${
              activeDocumentId === doc.id
                ? 'bg-white/10 border-primary text-primary-foreground'
                : 'bg-white/5 border-transparent text-muted-foreground hover:bg-white/8 hover:text-foreground'
            }`}
          >
            <FileText className="h-3 w-3" />
            <button
              onClick={() => onTabSelect(doc.id)}
              className="text-sm font-medium max-w-32 truncate"
            >
              {title}
              {hasUnsavedChanges && <span className="text-yellow-400 ml-1">•</span>}
            </button>
            {documents.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(doc.id);
                }}
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        );
      })}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onCreateNew}
        className="flex items-center gap-1 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-white/5"
      >
        <Plus className="h-3 w-3" />
        <span className="text-sm">Nuevo</span>
      </Button>
    </div>
  );
}