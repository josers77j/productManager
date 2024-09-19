import { Controller, Post, Body  } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Controller()
export class UsersController {
  constructor(private readonly prismaService: PrismaService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.prismaService.create(createUserDto);
  // }

}
