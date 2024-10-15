import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repository/users.repository';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
  ) {}
  async findOneByUserName(username: string) {
    try {
      return await this.userRepository.findOneByUserName(username);
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers() {
    try {
      return await this.userRepository.getUsers();
    } catch (err) {
      console.log(err);
    }
  }
    
}
