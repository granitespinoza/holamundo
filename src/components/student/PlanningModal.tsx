import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PlanningData {
  textType: string;
  mainTopic: string;
  audience: string;
  purpose: string;
}

interface PlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: PlanningData) => void;
}

export function PlanningModal({ isOpen, onClose, onComplete }: PlanningModalProps) {
  const [planningData, setPlanningData] = useState<PlanningData>({
    textType: '',
    mainTopic: '',
    audience: '',
    purpose: ''
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    const isComplete = Object.values(planningData).every(value => value.trim() !== '');
    
    if (!isComplete) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos de planificación.",
        variant: "destructive"
      });
      return;
    }

    onComplete(planningData);
    onClose();
    toast({
      title: "¡Planificación completa!",
      description: "Ahora puedes comenzar a escribir tu texto.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-md border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            📋 Guía de Planificación
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="textType" className="text-slate-300">Tipo de texto</Label>
            <Input
              id="textType"
              placeholder="Ej: Argumentativo, narrativo, expositivo..."
              value={planningData.textType}
              onChange={(e) => setPlanningData(prev => ({ ...prev, textType: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div>
            <Label htmlFor="mainTopic" className="text-slate-300">Tema principal</Label>
            <Input
              id="mainTopic"
              placeholder="¿Sobre qué vas a escribir?"
              value={planningData.mainTopic}
              onChange={(e) => setPlanningData(prev => ({ ...prev, mainTopic: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div>
            <Label htmlFor="audience" className="text-slate-300">Destinatario</Label>
            <Input
              id="audience"
              placeholder="¿Para quién escribes?"
              value={planningData.audience}
              onChange={(e) => setPlanningData(prev => ({ ...prev, audience: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>
          
          <div>
            <Label htmlFor="purpose" className="text-slate-300">Propósito</Label>
            <Input
              id="purpose"
              placeholder="¿Qué quieres lograr con tu texto?"
              value={planningData.purpose}
              onChange={(e) => setPlanningData(prev => ({ ...prev, purpose: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
          </div>
        </div>
        
        <div className="flex gap-2 mt-6">
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
          >
            Comenzar a escribir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}