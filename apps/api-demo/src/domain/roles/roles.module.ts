import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './service/roles.service';
import { RoleRepository } from './repository/roles.repository';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationService } from 'src/utils/pagination.service.utils';
import { JwtService } from '@nestjs/jwt';


@Module({
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, PrismaService, PaginationService, JwtService],
})
export class RolesModule {}
