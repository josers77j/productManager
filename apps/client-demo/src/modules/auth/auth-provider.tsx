import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from './auth-service';

// Define interfaces para User y TokenPayload
interface Permission {
  action: string;
  resource: {
    route: string;
  };
}

interface Role {
  permissions: Permission[];
}

interface User {
  role: Role;
}

interface TokenPayload {
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPermission: (action: string, route: string) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<TokenPayload>(token);
      setUser(decoded.user);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login({ username, password });
    const token = response.token; // Suponiendo que el token está en la respuesta
    localStorage.setItem('token', token); // Almacena el token
    const decoded = jwtDecode<TokenPayload>(token);
    setUser(decoded.user); // Actualiza el estado del usuario
  };

  const logout = () => {
    AuthService.logout();
    setUser(null); // Elimina el usuario del estado
  };

  const hasPermission = (action: string, route: string) => {
    if (!user || !user.role) return false;
    return user.role.permissions.some(
      (perm) => perm.action === action && perm.resource.route === route
    );
  };

  const value = { user, isAuthenticated: !!user, hasPermission, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
