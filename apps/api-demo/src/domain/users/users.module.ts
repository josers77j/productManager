import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationService } from 'src/utils/pagination.service.utils';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, PaginationService],
  exports: [UsersService],
})
export class UsersModule {}
