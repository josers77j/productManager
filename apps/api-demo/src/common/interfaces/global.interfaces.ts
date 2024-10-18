export interface IRole {
    id: number;
    name: string;
    description: string;
}

export interface JwtPayload {
    sub: number;
    username: string;
    role: string;
  }
  