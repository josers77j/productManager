import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateResourceDto } from '../dto/create-resource.dto';
import { dateTimeNow } from 'src/utils/date-time-now.utils';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/utils/pagination.service.utils';
import { resource } from '@prisma/client';
@Injectable()
export class ResourceRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginate: PaginationService,
  ) {}

  async createResource(createResourceDto: CreateResourceDto) {
    const {name, route } = createResourceDto
    return await this.prismaService.resource.create({
      data: {
        name,
        route,
        createdAt: dateTimeNow(),
      },
    });
  }
  getResource(paginationDto: PaginationDto) {
    const { page, perPage, filters } = paginationDto;
    const filter = filters?.['filters'];
    const where = {};
    const orderBy = {};
    const options = {
      page,
      perPage,
    };

    where['OR'] = {
      name: {
        contains: filter,
      },
      description: {
        contains: filter,
      },
    };

    orderBy['id'] = 'asc';
    const args = {
      where,
      orderBy,
    };

    return this.paginate.paginate<resource, typeof args>(
      this.prismaService.resource,
      args,
      options,
    );
  }

  updateResource(id, updateResourceDto: UpdateResourceDto) {
    return this.prismaService.resource.update({
      where: { id },
      data: updateResourceDto,
    });
  }
  removeResource(id) {
    return this.prismaService.resource.update({
      where: { id },
      data: { deleteAt: dateTimeNow() },
    });
  }
}
