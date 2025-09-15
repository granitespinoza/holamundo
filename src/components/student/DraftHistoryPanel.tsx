import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Draft } from '@/types/documents';
import { Clock, FileText, Trash2 } from 'lucide-react';

interface DraftHistoryPanelProps {
  drafts: Draft[];
  onLoadDraft: (draftId: string) => void;
  onDeleteDraft: (draftId: string) => void;
  formatTimestamp: (date: Date) => string;
}

export function DraftHistoryPanel({ 
  drafts, 
  onLoadDraft, 
  onDeleteDraft, 
  formatTimestamp 
}: DraftHistoryPanelProps) {
  const getWordCount = (content: string) => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  if (drafts.length === 0) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground text-lg flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Historial de Borradores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay borradores guardados</p>
            <p className="text-xs mt-1">Los borradores se guardan automáticamente</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-foreground text-lg flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Historial de Borradores
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          <div className="space-y-1 p-4">
            {drafts.map((draft, index) => (
              <div
                key={draft.id}
                className="group p-3 rounded-md border border-white/10 hover:border-white/20 transition-all hover:bg-white/5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      Versión {drafts.length - index}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {getWordCount(draft.content)} palabras
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteDraft(draft.id)}
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground mb-2">
                  {formatTimestamp(draft.savedAt)}
                </div>
                
                <div className="text-xs text-muted-foreground/80 mb-3 line-clamp-2">
                  {draft.content.substring(0, 120)}
                  {draft.content.length > 120 && '...'}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLoadDraft(draft.id)}
                  className="w-full text-xs bg-white/5 hover:bg-white/10"
                >
                  Cargar esta versión
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}