import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.getUsers();
  }


}
