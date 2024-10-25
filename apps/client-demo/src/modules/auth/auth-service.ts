import axios from 'axios';
import { LoginRequest, LoginResponse } from '../../interface/login.interface';



const API_URL = import.meta.env.VITE_API_URL;

export class AuthService {
  static async login({ username, password }: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
      return response.data;
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          throw new Error('Contraseña inválida.');
        } else if (err.response.status === 404) {
          throw new Error('No se encontró el usuario o fue eliminado.');
        }
        throw new Error('Error desconocido. Por favor, intenta nuevamente.');
      } else {
        throw new Error('Error al conectar con el servidor.');
      }
    }
  }

  static logout() {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica si hay un token en localStorage
  }
}
