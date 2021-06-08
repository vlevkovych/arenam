import { Injectable } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

import type { SignupInput } from '../auth/dto/signup.input';
import type { User } from './user.models';

@Injectable()
export class UserRepository {
    public constructor(private readonly prisma: PrismaService) {}

    public async createUser(input: SignupInput): Promise<void> {
        await this.prisma.user.create({
            data: {
                ...input,
            },
        });
    }

    public async findUserById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    public async findUserByEmail(emailAddress: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { emailAddress } });
    }

    public async findUsersByIds(authorIds: readonly number[]): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                id: {
                    in: [...authorIds],
                },
            },
        });
    }
}
