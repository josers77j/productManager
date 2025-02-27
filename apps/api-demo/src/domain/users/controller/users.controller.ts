import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { passwordUserDto } from '../dto/password-user.dto';
import { RoledUserDto } from '../dto/role-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from 'src/domain/auth/guard/auth.guard';
import { ExtractUser } from 'src/domain/auth/utils/jwt-extract.utils';
import { UserPayload } from 'src/common/interfaces/global.interfaces';
@UseGuards(AuthGuard)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @Query() paginationDto : PaginationDto,
  ) {
    return this.usersService.getUsers(paginationDto);
  }

  @Post()
  createUsers(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Body() updateUser: UpdateUserDto,
    @Param('id') id: number
  ){
    return this.usersService.updateUser(updateUser, id);
  }

  @Patch('password/:id')
  updatePassword(
    @Body() passwordUserDto: passwordUserDto,
    @Param('id') id: number
  ){
    return this.usersService.updatePassword(passwordUserDto, id);
  }

  @Patch('role/:id')
  updateRole(
    @Body() roledUserDto: RoledUserDto,
    @Param('id') id: number
  ){
    return this.usersService.updateRole(roledUserDto, id);
  }

  @Delete(':id')
  deleteUser(
    @Param('id') id: number
  ){
    return this.usersService.deleteUser(+id);
  }

  @Get('profile')
    getUserProfile(
        @ExtractUser() user: UserPayload
    ){
        return this.usersService.getUserProfile(user);
    }

}
