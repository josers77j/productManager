import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repository/roles.repository';


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

  findAll() {
    return `This action returns all roles`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
