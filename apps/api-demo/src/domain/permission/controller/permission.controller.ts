import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from 'src/domain/auth/guard/auth.guard';
@UseGuards(AuthGuard)
@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @Get()
  getPermission(
    @Query() paginationDto: PaginationDto
  ) {
    return this.permissionService.getPermission(paginationDto);
  }

  @Patch(':id')
  updatePermission(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.updatePermission(+id, updatePermissionDto);
  }

  @Delete(':id')
  removePermission(@Param('id') id: string) {
    return this.permissionService.removePermission(+id);
  }
}
