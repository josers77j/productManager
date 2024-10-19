import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repository/roles.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateRolePermissionDto } from '../dto/createRolePermission.dto';


@Injectable()
export class RolesService {

  constructor(private readonly roleRepository : RoleRepository) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const process = await this.roleRepository.createRole(createRoleDto);

      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al crear el rol');

      return { message: 'Rol creado exitosamente' };
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al crear el rol');
    }
  }

  async getRoles(paginationDto : PaginationDto) {
    try {
      const process = await this.roleRepository.getRoles(paginationDto);

      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al obtener los roles');

      return process;
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al obtener los roles');
    }
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const process = await this.roleRepository.updateRole(id, updateRoleDto);
      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al actualizar el rol');

      return { message: 'Rol actualizado exitosamente' };
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al actualizar el rol');
    }
  }

  async removeRole(id: number) {
    try {
      const process = await this.roleRepository.removeRole(id);
      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al eliminar el rol');

      return { message: 'Rol eliminaddo exitosamente' };
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al actualizar el rol');
    }
  }

  async getRolePermissions(id: number) {
    try {
      const process = await this.roleRepository.getRolePermissions(id);
      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al obtener los permisos del rol');

      return process;
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al obtener los permisos del rol');
    }
  }

  async createRolePermission(createRolePermissionDto: CreateRolePermissionDto) {
    try {
      const process = await this.roleRepository.createRolePermission(createRolePermissionDto);
      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al asignar permisos al rol');

      return { message: 'Permisos asignados exitosamente' };
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al asignar permisos al rol');
    }
  }

  async updateRolePermission(id: number, updateRolePermissionDto: CreateRolePermissionDto) {
    try {
      const process = await this.roleRepository.updateRolePermission(id, updateRolePermissionDto);
      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al actualizar los permisos del rol');

      return { message: 'Permisos actualizados exitosamente' };
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al actualizar los permisos del rol');
    }
  }

  async removeRolePermission(id: number) {
    try {
      const process = await this.roleRepository.removeRolePermission(id);
      if(!process)
        throw new UnprocessableEntityException('Ocurrio un error al eliminar los permisos del rol');

      return { message: 'Permisos eliminados exitosamente' };
    }
    catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;

      throw new UnprocessableEntityException('Error al eliminar los permisos del rol');
    }
  }
}
