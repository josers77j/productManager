import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/domain/users/service/users.service';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from '../entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto) {
    const user = await this.usersService.findOneByUserName(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    delete user.password;

    const payload = { user };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }
}
