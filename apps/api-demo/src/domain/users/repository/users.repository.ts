import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { passwordUserDto } from '../dto/password-user.dto';
import { RoledUserDto } from '../dto/role-user.dto';
import { dateTimeNow } from 'src/utils/date-time-now.utils';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByUserName(username: string) {
    return await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
      include: {
        role: true,
      },
    });
  }

  async getUsers() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        lastName: true,
        role: {
          select: {
            id : true,
            name: true,
          },
        },
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
        createdAt: dateTimeNow(),
      },            
    });
  }

  async updateUser(
    updateUser: UpdateUserDto,
    id: number,
  ) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUser,
    });
  }

  async updatePassword(passwordUserDto: passwordUserDto, id: number) {
    const { password } = passwordUserDto;
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }

  async updateRole(roleUserDto: RoledUserDto, id: number) {
    const { roleId } = roleUserDto;
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        roleId: +roleId,
      },
    });
  }

  async deleteUser(id: number) {
    console.log("ssss", dateTimeNow());
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        deleteAt: dateTimeNow(),
      },
    });
  }
}
