import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Student, Teacher } from '@/types';
import { mockCredentials, mockStudents, mockTeacher } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('tutorAI_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'teacher'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let authenticatedUser: User | null = null;
    
    if (role === 'student') {
      if (email === mockCredentials.student.email && password === mockCredentials.student.password) {
        authenticatedUser = mockStudents[0]; // Joaquín Quispe
      }
    } else if (role === 'teacher') {
      if (email === mockCredentials.teacher.email && password === mockCredentials.teacher.password) {
        authenticatedUser = mockTeacher;
      }
    }
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('tutorAI_user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tutorAI_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}