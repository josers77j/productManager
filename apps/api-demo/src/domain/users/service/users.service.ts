import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { UsersRepository } from '../repository/users.repository';
@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly userRepository: UsersRepository,
  ) {}
  // async create(createUserDto: CreateUserDto) {
  //   return await this.prismaService.save(createUserDto);
  // }

  async findOneByUserName(username: string) {
    return await this.userRepository.findOneByUserName(username);
  }
}
