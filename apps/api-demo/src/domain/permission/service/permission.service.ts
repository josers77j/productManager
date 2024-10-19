import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionRepository } from '../repository/permission.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}
  createPermission(createPermissionDto: CreatePermissionDto) {
    try {
      const process = this.permissionRepository.createPermission(createPermissionDto);
      if(!process)
        throw new UnprocessableEntityException('Error al crear el permiso');

      return { message: 'Permiso creado exitosamente' };
    }catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;
      throw new UnprocessableEntityException('Error al crear el permiso');
    }
  }

  getPermission(paginationDto: PaginationDto) {
    try {
      const process = this.permissionRepository.getPermission(paginationDto);
      if(!process)
        throw new UnprocessableEntityException('Error al obtener los permisos');

      return process;
    }catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;
      throw new UnprocessableEntityException('Error al obtener los permisos');
    }
  }

  updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const process = this.permissionRepository.updatePermission(id, updatePermissionDto);
      if(!process)
        throw new UnprocessableEntityException('Error al actualizar el permiso');

      return { message: 'Permiso actualizado exitosamente' };
    }catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;
      throw new UnprocessableEntityException('Error al actualizar el permiso');
    }
  }

  removePermission(id: number) {
    try {
      const process = this.permissionRepository.removePermission(id);
      if(!process)
        throw new UnprocessableEntityException('Error al eliminar el permiso');

      return { message: 'Permiso eliminado exitosamente' };
    }catch(err){
      if(err instanceof UnprocessableEntityException)
        throw err;
      throw new UnprocessableEntityException('Error al eliminar el permiso');
    }
  }
}
