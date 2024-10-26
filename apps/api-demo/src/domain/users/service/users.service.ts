import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../repository/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { passwordUserDto } from '../dto/password-user.dto';
import { RoledUserDto } from '../dto/role-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserPayload } from 'src/common/interfaces/global.interfaces';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
  ) {}
  async findOneByUserName(username: string) {
    try {
      const process = await this.userRepository.findOneByUserName(username);
      if (!process)
        throw new NotFoundException('No se encontro el usuario o el usuario fue eliminado');
      return process;
    } catch (err) {
      Logger.error(err);
      if(err instanceof NotFoundException)
        throw err;
      throw new InternalServerErrorException('Error al obtener el usuario');
    }
  }

  async getUsers(paginationDto: PaginationDto) {
    try {
      const process = await this.userRepository.getUsers(paginationDto);
      if (!process)
        throw new UnprocessableEntityException('Ocurrio un error al obtener los usuarios');
      return process;
    } catch (err) {
      Logger.error(err);
      if(err instanceof UnprocessableEntityException)
        throw err;
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async createUser(createUserDto : CreateUserDto){
    try {
      const { password } = createUserDto;
      const saltRounds = 12;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      createUserDto.password = hashedPassword;

      const process = await this.userRepository.createUser(createUserDto);
      if (!process)
        throw new UnprocessableEntityException('Ocurrio un error al crear el usuario');

      return { message: 'usuario creado exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException)
        throw err;
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async updateUser(
    updateUser: UpdateUserDto,
    id: number,
  ) {
    try {
      const process = await this.userRepository.updateUser(updateUser, id);
      if (!process)
        throw new UnprocessableEntityException('Ocurrio un error al actualizar el usuario');

      return { message: 'usuario actualizado exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException)
        throw err;

      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async updatePassword(passwordUserDto: passwordUserDto, id: number) {
    try {
      const { password } = passwordUserDto;
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      passwordUserDto.password = hashedPassword;

      const process = await this.userRepository.updatePassword(passwordUserDto, id);
      if (!process)
        throw new UnprocessableEntityException('Ocurrio un error al actualizar la contraseña');

      return { message: 'contraseña actualizada exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException)
        throw err;

      throw new InternalServerErrorException('Error al actualizar la contraseña');
    }
  }

  async updateRole(roledUserDto: RoledUserDto, id: number) {
    try {
      const process = await this.userRepository.updateRole(roledUserDto, id);
      if (!process)
        throw new UnprocessableEntityException('Ocurrio un error al actualizar el rol');

      return { message: 'rol actualizado exitosamente' };
    } catch (error) {
      Logger.error(error);
      if (error instanceof UnprocessableEntityException)
        throw error;
      throw new InternalServerErrorException('Error al actualizar el rol');
    }
  }

  async deleteUser(id: number) {
    try {
      const process = await this.userRepository.deleteUser(id);
      if (!process)
        throw new UnprocessableEntityException('Ocurrio un error al eliminar el usuario');

      return { message: 'usuario eliminado exitosamente' };
    } catch (err) {
      Logger.error(err);
      if (err instanceof UnprocessableEntityException)
        throw err;

      throw new InternalServerErrorException('Error en el servidor al eliminar el usuario');
    }
  }

  async getUserProfile(user: UserPayload) {
    try {
      return await this.userRepository.getUserProfile(user);
    }catch (err) {
        Logger.error(err);
        throw new InternalServerErrorException('Error al obtener el perfil del usuario');
    }
  }
}
