import { Module } from '@nestjs/common';
import { ResourceService } from './service/resource.service';
import { ResourceController } from './controller/resource.controller';
import { ResourceRepository } from './repository/resource.repository';
import { PrismaService } from 'prisma/prisma.service';
import { PaginationService } from 'src/utils/pagination.service.utils';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ResourceController],
  providers: [
    ResourceService,
    ResourceRepository,
    PrismaService,
    JwtService,
    PaginationService,
  ],
})
export class ResourceModule {}
