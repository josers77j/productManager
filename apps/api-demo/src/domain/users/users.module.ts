import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { Repository } from 'typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Repository],  
})
export class UsersModule {}
