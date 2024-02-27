import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private photoRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.photoRepository.find();
    }
}
