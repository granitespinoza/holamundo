import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password, selectedRole);
      
      if (success) {
        toast({
          title: "¡Bienvenido!",
          description: "Inicio de sesión exitoso",
        });
        
        // Redirect based on role
        if (selectedRole === 'student') {
          navigate('/student');
        } else {
          navigate('/teacher');
        }
      } else {
        toast({
          title: "Error de autenticación",
          description: "Credenciales incorrectas. Verifica tu email y contraseña.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema con el inicio de sesión",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill credentials based on role
  const handleRoleChange = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('student01@gmail.com');
      setPassword('123456');
    } else {
      setEmail('teacher01@gmail.com');
      setPassword('112233');
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <CardTitle className="text-2xl font-bold text-white">
          ¡Bienvenido a Tutor AI!
        </CardTitle>
        <CardDescription className="text-slate-300">
          Selecciona tu rol e inicia sesión para comenzar
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <Label className="text-white text-sm font-medium">Soy un...</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={selectedRole === 'student' ? 'default' : 'outline'}
              className={`flex-1 ${
                selectedRole === 'student' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              onClick={() => handleRoleChange('student')}
            >
              👨‍🎓 Estudiante
            </Button>
            <Button
              type="button"
              variant={selectedRole === 'teacher' ? 'default' : 'outline'}
              className={`flex-1 ${
                selectedRole === 'teacher' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
              onClick={() => handleRoleChange('teacher')}
            >
              👩‍🏫 Docente
            </Button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white text-sm">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white border-0 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* Demo credentials hint */}
        <div className="text-xs text-slate-400 text-center space-y-1">
          <p className="font-medium">Credenciales de prueba:</p>
          <p>Estudiante: student01@gmail.com / 123456</p>
          <p>Docente: teacher01@gmail.com / 112233</p>
        </div>
      </CardContent>
    </Card>
  );
}