import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
    ) {
    }
    create(CreateUserDto) {
        return 'This action adds a new user';
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, UpdateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
}