import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassroomTask } from '@/types';
import { mockClassroomTasks } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, ExternalLink, BookOpen, FileText, HelpCircle, BarChart3 } from 'lucide-react';

interface GoogleClassroomTasksProps {
  onWorkOnTask?: (task: ClassroomTask) => void;
}

export function GoogleClassroomTasks({ onWorkOnTask }: GoogleClassroomTasksProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'overdue'>('all');
  const { toast } = useToast();

  const getTaskIcon = (type: ClassroomTask['type']) => {
    switch (type) {
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      case 'project': return <BarChart3 className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: ClassroomTask['priority'], isOverdue: boolean) => {
    if (isOverdue) return 'bg-red-500/20 text-red-300 border-red-400/30';
    switch (priority) {
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-400/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-400/30';
    }
  };

  const getStatusColor = (status: ClassroomTask['status']) => {
    switch (status) {
      case 'pending': return 'bg-blue-500/20 text-blue-300';
      case 'in-progress': return 'bg-purple-500/20 text-purple-300';
      case 'completed': return 'bg-green-500/20 text-green-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const now = new Date();
    const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 0) {
      return { text: 'Vencida', color: 'text-red-400' };
    } else if (diffInHours < 24) {
      return { text: `En ${Math.round(diffInHours)}h`, color: 'text-red-400' };
    } else if (diffInHours < 72) {
      return { text: `En ${Math.round(diffInHours / 24)}d`, color: 'text-yellow-400' };
    } else {
      return { 
        text: date.toLocaleDateString('es-ES', { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }), 
        color: 'text-slate-300' 
      };
    }
  };

  const filteredTasks = mockClassroomTasks.filter(task => {
    switch (filter) {
      case 'pending': return task.status === 'pending' && !task.isOverdue;
      case 'in-progress': return task.status === 'in-progress';
      case 'overdue': return task.isOverdue;
      default: return true;
    }
  }).sort((a, b) => {
    // Sort by priority: overdue > high > medium > low
    if (a.isOverdue && !b.isOverdue) return -1;
    if (!a.isOverdue && b.isOverdue) return 1;
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const pendingCount = mockClassroomTasks.filter(t => t.status === 'pending' && !t.isOverdue).length;
  const overdueCount = mockClassroomTasks.filter(t => t.isOverdue).length;
  const inProgressCount = mockClassroomTasks.filter(t => t.status === 'in-progress').length;

  const handleWorkOnTask = (task: ClassroomTask) => {
    if (task.type === 'assignment' && task.title.toLowerCase().includes('ensayo')) {
      onWorkOnTask?.(task);
      toast({
        title: "Tarea cargada",
        description: `Trabajando en: ${task.title}`,
      });
    } else {
      // For non-writing tasks, just open in classroom
      window.open(task.classroomUrl, '_blank');
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Tareas de Google Classroom
          </CardTitle>
          <Badge className="bg-blue-500/20 text-blue-300">
            {filteredTasks.length} tareas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filter */}
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas ({mockClassroomTasks.length})</SelectItem>
            <SelectItem value="pending">Pendientes ({pendingCount})</SelectItem>
            <SelectItem value="in-progress">En progreso ({inProgressCount})</SelectItem>
            <SelectItem value="overdue">Vencidas ({overdueCount})</SelectItem>
          </SelectContent>
        </Select>

        {/* Tasks List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTasks.map((task) => {
            const dueInfo = formatDueDate(task.dueDate);
            return (
              <div
                key={task.id}
                className={`p-3 rounded-lg border transition-all hover:bg-white/5 ${
                  task.isOverdue 
                    ? 'border-red-400/30 bg-red-500/5' 
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="text-slate-300">
                      {getTaskIcon(task.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm leading-tight truncate">
                        {task.title}
                      </h4>
                      <p className="text-slate-400 text-xs truncate">
                        {task.courseName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-1.5 py-0.5 ${getPriorityColor(task.priority, task.isOverdue)}`}
                    >
                      {task.isOverdue ? 'Vencida' : task.priority}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className={dueInfo.color}>
                        {dueInfo.text}
                      </span>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                      {task.status === 'pending' ? 'Pendiente' : 
                       task.status === 'in-progress' ? 'En progreso' : 'Completada'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1">
                    {task.type === 'assignment' && task.title.toLowerCase().includes('ensayo') && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleWorkOnTask(task)}
                        className="text-xs px-2 py-1 h-6 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                      >
                        Trabajar aquí
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(task.classroomUrl, '_blank')}
                      className="text-xs px-2 py-1 h-6 text-slate-400 hover:text-white"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No hay tareas que coincidan con el filtro</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}