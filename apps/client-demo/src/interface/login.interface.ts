export interface LoginResponse {
    token: string;
    email: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  }

  export interface AuthContextType {
    isAuthenticated: boolean;
    userRole?: string;  // Nueva propiedad para el rol
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
  }

  export interface ProtectedRouteProps {
    element: React.ReactElement;
    path: string;
    requiredRole?: string;
  }