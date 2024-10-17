import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateRoleDto } from "../dto/create-role.dto";

@Injectable()
export class RoleRepository{
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async createRole(createRoleDto: CreateRoleDto){
        return await this.prismaService.role.create({
            data: {
                ...createRoleDto
            }
        })
    }
}