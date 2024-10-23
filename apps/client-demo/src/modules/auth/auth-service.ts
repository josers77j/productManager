import axios from 'axios';

export interface LoginResponse {
    token: string;
    email: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}
const API_URL = import.meta.env.VITE_API_URL;

export class AuthService {
    static async login({ username, password }: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
                username,
                password,
            });

            // Almacenar el token en localStorage
            localStorage.setItem('token', response.data.token);

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
}
