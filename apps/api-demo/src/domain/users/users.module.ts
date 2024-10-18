import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';

import { UsersRepository } from './repository/users.repository';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationService } from 'src/utils/pagination.service.utils';
import { JwtStrategy } from '../auth/utils/jwt-strategy.utils';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, PaginationService, JwtStrategy],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
