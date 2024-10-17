import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './service/roles.service';
import { RoleRepository } from './repository/roles.repository';
import { PrismaService } from 'prisma/prisma.service';


@Module({
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, PrismaService],
})
export class RolesModule {}
