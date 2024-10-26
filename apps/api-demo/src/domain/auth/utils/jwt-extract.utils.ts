import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
  // Añade más campos según sea necesario
}

const secretKey = process.env.JWT_SECRET;

export const ExtractUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    try {
      const decoded = jwt.verify(token, secretKey) as UserPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },
);
