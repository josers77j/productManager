import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from './auth-service';

// Define interfaces para User y TokenPayload
interface PermissionDetail {
  action: string;
  resource: {
    route: string;
  };
}

interface Permission {
  permission: PermissionDetail;
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
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
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
    const token = response.token;
    localStorage.setItem('token', token);
    const decoded = jwtDecode<TokenPayload>(token);
    setUser(decoded.user);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const hasPermission = (action: string, route: string) => {
    if (!user || !user.role) return false;
    console.log(user, 'useeeeeeer');
    console.log(action, route, 'lo que se vieneee');
    console.log(user.role.permissions , 'pemisosss');
    console.log(user.role.permissions.some(
      (perm) =>
        perm.permission.action === action && perm.permission.resource.route === route
    ), 'permisitos acaaaaaaaaaa')
    return user.role.permissions.some(
      (perm) =>
        perm.permission.action === action && perm.permission.resource.route === route
    );
  };

  const value = { user, isAuthenticated: !!user, hasPermission, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return context;
};
