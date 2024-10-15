import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByUserName(username: string) {
    return await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async getUsers() {
    return await this.prismaService.user.findMany();
  }
}
