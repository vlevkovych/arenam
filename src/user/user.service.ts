import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from './user.repository';

import type { User } from './user.models';

@Injectable()
export class UserService {
    public constructor(private readonly userRepository: UserRepository) {}

    public async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
