import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './service/permission.service';
import { PaginationService } from 'src/utils/pagination.service.utils';
import { PermissionRepository } from './repository/permission.repository';

@Module({
  controllers: [PermissionController],
  providers: [
    PermissionService,
    PrismaService,
    JwtService,
    PaginationService,
    PermissionRepository,
  ],
})
export class PermissionModule {}
