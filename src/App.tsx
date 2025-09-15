import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import HomePage from "./pages/HomePage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import SlideshowPreview from "./pages/SlideshowPreview";
import SlideshowPresentation from "./pages/SlideshowPresentation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'student' | 'teacher' }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== allowedRole) {
    return <Navigate to={user.role === 'student' ? '/student' : '/teacher'} replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<HomePage />} />
            <Route 
              path="/student" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher" 
              element={
                <ProtectedRoute allowedRole="teacher">
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/slideshow/preview/:id" 
              element={
                <ProtectedRoute allowedRole="teacher">
                  <SlideshowPreview />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/slideshow/present/:id" 
              element={
                <ProtectedRoute allowedRole="teacher">
                  <SlideshowPresentation />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
