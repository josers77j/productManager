import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RolesService } from '../service/roles.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from 'src/domain/auth/guard/auth.guard';
import { CreateRolePermissionDto } from '../dto/createRolePermission.dto';

@UseGuards(AuthGuard)
@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  getRoles(
    @Query() paginationDto: PaginationDto
  ) {
    return this.rolesService.getRoles(paginationDto);
  }

  @Patch(':id')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(+id, updateRoleDto);
  }

  @Delete(':id')
  removeRole(@Param('id') id: string) {
    return this.rolesService.removeRole(+id);
  }

  @Get('role-permission/:id')
  getRolePermission(@Param('id') id: string) {
    return this.rolesService.getRolePermissions(+id);
  }

  @Post('role-permission')
  createRolePermission(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolesService.createRolePermission(createRolePermissionDto);
  }

  @Patch('role-permission/:id')
  updateRolePermission(@Param('id') id: string, @Body() updateRolePermissionDto: CreateRolePermissionDto) {
    return this.rolesService.updateRolePermission(+id, updateRolePermissionDto);
  }

  @Delete('role-permission/:id')
  removeRolePermission(@Param('id') id: string) {
    return this.rolesService.removeRolePermission(+id);
  }
}
