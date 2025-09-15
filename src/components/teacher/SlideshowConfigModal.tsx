import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Sparkles, RotateCcw } from 'lucide-react';
import { SkillOption, SkillType } from '@/types/slideshow';
import { useSlideshowGenerator } from '@/hooks/useSlideshowGenerator';

const DEMO_TEXT = `El reciclaje es muy importante para nuestro planeta. En primer lugar, reduce la contaminación ambiental. Por ejemplo, cuando reciclamos papel, evitamos que se corten más árboles. Además, el reciclaje de plásticos reduce la cantidad de desechos en los océanos. En segundo lugar, el reciclaje genera beneficios económicos. En consecuencia, la industria del reciclaje crea empleos y oportunidades de negocio. Por esta razón, es importante que tanto gobiernos como ciudadanos trabajen juntos.`;

const DEMO_SKILLS: SkillType[] = ['comprension-literal', 'comprension-inferencial', 'uso-conectores'];

const skillOptions: SkillOption[] = [
  { id: 'comprension-literal', label: 'Comprensión Literal', description: 'Información explícita del texto' },
  { id: 'comprension-inferencial', label: 'Comprensión Inferencial', description: 'Deducciones e interpretaciones' },
  { id: 'comprension-critica', label: 'Comprensión Crítica', description: 'Evaluación y opinión fundamentada' },
  { id: 'reglas-tildacion', label: 'Reglas de Tildación', description: 'Uso correcto de tildes' },
  { id: 'uso-conectores', label: 'Uso de Conectores', description: 'Cohesión y coherencia textual' },
  { id: 'figuras-literarias', label: 'Figuras Literarias', description: 'Recursos estilísticos y retóricos' },
  { id: 'metrica', label: 'Métrica', description: 'Análisis de verso y rima' },
  { id: 'coherencia-textual', label: 'Coherencia Textual', description: 'Unidad temática y lógica' },
  { id: 'cohesion-textual', label: 'Cohesión Textual', description: 'Conexiones gramaticales' },
];

interface SlideshowConfigModalProps {
  children: React.ReactNode;
  onSlideshowGenerated: (slideshowId: string) => void;
}

export function SlideshowConfigModal({ children, onSlideshowGenerated }: SlideshowConfigModalProps) {
  const [open, setOpen] = useState(false);
  const [sourceType, setSourceType] = useState<'pdf' | 'text'>('text');
  const [textContent, setTextContent] = useState(DEMO_TEXT);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<SkillType[]>(DEMO_SKILLS);
  const [questionCount, setQuestionCount] = useState(3);
  
  const { generateSlideshow, isGenerating } = useSlideshowGenerator();

  const handleSkillToggle = (skillId: SkillType, checked: boolean) => {
    if (checked) {
      setSelectedSkills(prev => [...prev, skillId]);
    } else {
      setSelectedSkills(prev => prev.filter(id => id !== skillId));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    }
  };

  const clearDemo = () => {
    setTextContent('');
    setSelectedSkills([]);
    setQuestionCount(10);
    setSourceType('text');
    setSelectedFile(null);
  };

  const isDemo = textContent === DEMO_TEXT && 
    selectedSkills.length === 3 &&
    selectedSkills.includes('comprension-literal') &&
    selectedSkills.includes('comprension-inferencial') &&
    selectedSkills.includes('uso-conectores') &&
    questionCount === 3;

  const handleGenerate = async () => {
    if (selectedSkills.length === 0) return;
    if (sourceType === 'text' && !textContent.trim()) return;
    if (sourceType === 'pdf' && !selectedFile) return;

    const sourceContent = sourceType === 'text' ? textContent : selectedFile?.name || '';
    
    const slideshowId = await generateSlideshow({
      sourceType,
      sourceContent,
      skills: selectedSkills,
      questionCount
    });

    setOpen(false);
    onSlideshowGenerated(slideshowId);
  };

  const isValid = selectedSkills.length > 0 && 
    (sourceType === 'text' ? textContent.trim() : selectedFile) &&
    questionCount >= 1 && questionCount <= 30;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-slate-800 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            Crear Diapositivas con IA
            {isDemo && (
              <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                Modo Demo
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-slate-300 flex items-center justify-between">
            <span>Configura el contenido y las habilidades para generar preguntas automáticamente</span>
            {isDemo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearDemo}
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 h-6 px-2"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Limpiar Demo
              </Button>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Source Content */}
          <div>
            <Label className="text-white font-medium">Fuente del Contenido</Label>
            <Tabs value={sourceType} onValueChange={(value) => setSourceType(value as 'pdf' | 'text')}>
              <TabsList className="bg-white/10 border-white/20 mb-4">
                <TabsTrigger value="text" className="data-[state=active]:bg-white/20">
                  <FileText className="h-4 w-4 mr-2" />
                  Escribir Texto
                </TabsTrigger>
                <TabsTrigger value="pdf" className="data-[state=active]:bg-white/20">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir PDF
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-2">
                <Textarea
                  placeholder="Escribe o pega aquí el texto sobre el cual quieres generar preguntas..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="min-h-[120px] bg-slate-900 border-white/10 text-white"
                />
                <p className="text-xs text-slate-400">
                  {textContent.length} caracteres
                </p>
              </TabsContent>

              <TabsContent value="pdf" className="space-y-2">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <Label htmlFor="pdf-upload" className="cursor-pointer">
                    <span className="text-white">Haz clic para subir un archivo PDF</span>
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </Label>
                  {selectedFile && (
                    <p className="text-green-400 text-sm mt-2">
                      ✓ {selectedFile.name} seleccionado
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Question Count */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-white font-medium">Cantidad de Preguntas</Label>
              <Input
                type="number"
                min="1"
                max="30"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value) || 10)}
                className="bg-slate-900 border-white/10 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">Entre 1 y 30 preguntas</p>
            </div>
          </div>

          {/* Skills Selection */}
          <div>
            <Label className="text-white font-medium mb-3 block">
              Habilidades a Evaluar ({selectedSkills.length} seleccionadas)
            </Label>
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {skillOptions.map((skill) => (
                <Card key={skill.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={skill.id}
                        checked={selectedSkills.includes(skill.id)}
                        onCheckedChange={(checked) => 
                          handleSkillToggle(skill.id, checked === true)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={skill.id}
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          {skill.label}
                        </Label>
                        <p className="text-xs text-slate-400 mt-1">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={!isValid || isGenerating}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white mr-2" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generar Diapositivas
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}