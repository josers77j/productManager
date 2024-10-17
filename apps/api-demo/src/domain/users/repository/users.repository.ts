import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { passwordUserDto } from '../dto/password-user.dto';
import { RoledUserDto } from '../dto/role-user.dto';
import { dateTimeNow } from 'src/utils/date-time-now.utils';

import { user } from '@prisma/client';
import { PaginationService } from 'src/utils/pagination.service.utils';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async findOneByUserName(username: string) {
    return await this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            username,
          },
          {
            deleteAt: null,
          },
        ],
      },
      include: {
        role: true,
      },
    });
  }

  async getUsers(paginationDto: PaginationDto) {
    const { page, perPage, filters } = paginationDto;

    const where = [];

    if (filters?.['filter']) {
      where.push({
        username: {
          contains: filters?.['filter'],
        },
      });
    }

    where.push({
      deleteAt: null,
    });

    const options = { page, perPage };
    const args = {
      where,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        lastName: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    };

    // Usamos el PaginationService para paginar los resultados
    return this.paginationService.paginate<user, typeof args>(
      this.prismaService.user,
      args,
      options
    );
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
