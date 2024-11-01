import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from './auth-service';
import { Center, Spinner } from '@chakra-ui/react';

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
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser(decoded.user);

      } catch (error) {
        logout();
      }
    }
    setIsLoading(false); // Indica que la carga ha terminado
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login({ username, password });
    const token = response.token;
    localStorage.setItem('token', token);
    const decoded = jwtDecode<TokenPayload>(token);
    setUser(decoded.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('sessionStart');
    AuthService.logout();
    setUser(null);
  };

  const hasPermission = (action: string, route: string) => {
    if (!user || !user.role) return false;
    const process= user.role.permissions.some(
      (perm) =>
        perm.permission.action === action && perm.permission.resource.route === route
    );

    
    return process;
  };


  const value = { user, isAuthenticated: !!user, hasPermission, login, logout };

  if (isLoading) {
    return (
      <Center height="100vh" bg="gray.900">
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <p style={{ color: 'white', marginTop: '16px' }}>Cargando...</p>
      </Center>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  return context;
};
