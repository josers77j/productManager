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