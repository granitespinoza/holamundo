import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DailyPointsCardProps {
  dailyPoints: number;
  challengesCompleted: number;
  maxChallengesPerDay: number;
  streak: number;
}

export function DailyPointsCard({ 
  dailyPoints, 
  challengesCompleted, 
  maxChallengesPerDay, 
  streak 
}: DailyPointsCardProps) {
  const pointsPercentage = Math.min((dailyPoints / 45) * 100, 100);
  const challengesRemaining = maxChallengesPerDay - challengesCompleted;
  
  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center gap-2">
          ⭐ Puntos de Hoy
          {streak > 0 && (
            <Badge className="bg-points-gold/20 text-points-gold border-points-gold/30">
              🔥 {streak} días
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-points-gold mb-1">
            {dailyPoints}
          </div>
          <div className="text-sm text-muted-foreground">
            puntos de 45 posibles
          </div>
          <Progress value={pointsPercentage} className="h-2 mt-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-primary">
              {challengesCompleted}/{maxChallengesPerDay}
            </div>
            <div className="text-xs text-muted-foreground">
              Retos completados
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-secondary">
              {challengesRemaining}
            </div>
            <div className="text-xs text-muted-foreground">
              Retos restantes
            </div>
          </div>
        </div>
        
        {challengesRemaining === 0 && (
          <Badge className="w-full justify-center bg-success-highlight/20 text-success-highlight border-success-highlight/30">
            ✅ ¡Máximo diario alcanzado!
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}