import React, { createContext, useContext, useState } from 'react';
import { AuthService } from './auth-service';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  const login = async (username: string, password: string) => {
    await AuthService.login({ username, password });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false); // Asegura que el estado se actualiza
    localStorage.clear();  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
