import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  // async create(createUserDto: CreateUserDto) {
  //   return await this.prismaService.save(createUserDto);
  // }

  // async findOneByEmail(email: string) {
  //   return await this.prismaService.findOneBy({ email });
  // }
}
