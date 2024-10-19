import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateRoleDto } from "../dto/create-role.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { role } from "@prisma/client";
import { PaginationService } from "src/utils/pagination.service.utils";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { dateTimeNow } from "src/utils/date-time-now.utils";
import { CreateRolePermissionDto } from "../dto/createRolePermission.dto";

@Injectable()
export class RoleRepository{
    constructor(
        private readonly prismaService: PrismaService,
        private readonly paginationService: PaginationService
    ){}

    async createRole(createRoleDto: CreateRoleDto){
        const { name } = createRoleDto;
        return await this.prismaService.role.create({
            data: {
                name,
                createdAt: dateTimeNow()
            }
        })
    }

    async getRoles(paginationDto: PaginationDto){
        const { page, perPage, filters } = paginationDto;    
        const where = {};
        const orderBy = {};
        const options = { page, perPage };

        where['name'] = {
            contains: filters?.['filter'] || '',
            mode: 'insensitive'
        }

        where['deleteAt'] = null;

        orderBy['id'] = 'asc';
        const args = {
            where,
            orderBy
        }         

        return this.paginationService.paginate<role, typeof args>(            
                this.prismaService.role,
                args,
                options            
        )
    }

    async updateRole(id: number, updateRoleDto: UpdateRoleDto){
        return await this.prismaService.role.update({
            where: {
                id
            },
            data: {
                ...updateRoleDto
            }
        })
    }

    async removeRole(id: number){
        return await this.prismaService.role.update({
            where: {
                id
            },
            data: {
                deleteAt: dateTimeNow()
            }
        })
    }

    async getRolePermissions(roleId: number){
        return await this.prismaService.rolePermission.findMany({
            where: {
                roleId
            },
            select: {
                permission: true,
                role:{
                    select: {
                        id: true,
                        name: true                        
                    }
                }
            }
        })
    }

    async createRolePermission(createRolePermissionDto: CreateRolePermissionDto){
        const { roleId, permissionId } = createRolePermissionDto;
        return await this.prismaService.rolePermission.create({
            data: {
                roleId,
                permissionId,
                createdAt: dateTimeNow()
            }
        })
    }

    async updateRolePermission(id: number, updateRolePermissionDto: CreateRolePermissionDto){
        return await this.prismaService.rolePermission.update({
            where: {
                id
            },
            data: {
                ...updateRolePermissionDto
            }
        })
    }

    async removeRolePermission(id: number){
        return await this.prismaService.rolePermission.update({
            where: {
                id
            },
            data: {
                deleteAt: dateTimeNow()
            }
        })
    }
}