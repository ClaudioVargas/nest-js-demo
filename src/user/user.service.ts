import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async save(user: UserDto): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser)
    }

    async findById(userId: number): Promise<User[]> {
        return this.userRepository.findBy({
            id: userId
        });
    }
}
