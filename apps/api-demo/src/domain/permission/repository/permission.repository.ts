import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { dateTimeNow } from "src/utils/date-time-now.utils";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PaginationService } from "src/utils/pagination.service.utils";
import { permission } from "@prisma/client";

@Injectable()
export class PermissionRepository {
    constructor(private readonly prismaService : PrismaService,
        private readonly paginate: PaginationService
    ) {}

    createPermission(createPermissionDto: CreatePermissionDto) {
        return this.prismaService.permission.create({
            data:{
                action: createPermissionDto.action,
                description: createPermissionDto.description,
                resourceId: createPermissionDto.resourceId,
                createdAt: dateTimeNow(),
            }
            
        });
    }
    getPermission(paginationDto: PaginationDto) {
        const { page, perPage, filters } = paginationDto;
        const where = {};
        const orderBy = {};
        const select = {};
        const options = { page, perPage };


        select['id'] = true;
        select['action'] = true;
        select['description'] = true;
        select['resource'] = {
            select: {
              id: true,
              name: true,
              route: true,
            },
          };

        where['OR'] = [
            {
                action: {
                    contains: filters?.['filter'] || '',
                    mode: 'insensitive'
                },
            },
            {
                description: {
                    contains: filters?.['filter'] || '',
                    mode: 'insensitive'
                }
            }
        ]

        where['deleteAt'] = null;

        const args = {
            where,
            select,
            orderBy
        }
        return this.paginate.paginate<permission, typeof args>(
            this.prismaService.permission,
            args,
            options
        )   
    }
    
    updatePermission(id, updatePermissionDto) {
        return this.prismaService.permission.update({
            where: {
                id
            },
            data: {
                ...updatePermissionDto,
            }
        });
    }
    removePermission(id) {
        return this.prismaService.permission.update({
            where: {
                id
            },
            data: {
                deleteAt: dateTimeNow()
            }
        });
    }
}