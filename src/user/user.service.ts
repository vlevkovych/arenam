import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import type { User } from './user.models';

@Injectable()
export class UserService {
    public constructor(private readonly prisma: PrismaService) {}

    public async getUser(id: number): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
