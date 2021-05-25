import { Injectable } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import type { SignupInput } from './dto/signup.input';
import type { User } from './user.models';

@Injectable()
export class UserService {
    public constructor(private readonly prisma: PrismaService) {}

    public async getUser(id: number): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { id } });
    }

    public async createUser(
        signupInput: Readonly<SignupInput>,
    ): Promise<string> {
        await this.prisma.user.create({
            data: {
                emailAddress: signupInput.emailAddress,
                name: signupInput.name,
                password: signupInput.password,
            },
        });

        return 'Signup Successful';
    }
}
