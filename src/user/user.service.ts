import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import type { SignupInput } from './dto/signup.input';
import type { User } from './user.models';
import * as bcrypt from 'bcrypt';
import { signupInputValidationSchema } from './validation/signup.input.validation';

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

    public async createUser(
        signupInput: Readonly<SignupInput>,
    ): Promise<string> {
        const user = await this.prisma.user.findUnique({
            where: { emailAddress: signupInput.emailAddress },
        });
        if (user) {
            throw new BadRequestException(
                'User with same email is already exist',
            );
        }

        try {
            await signupInputValidationSchema.validateAsync(signupInput);
        } catch (error: unknown) {
            throw new BadRequestException(error);
        }

        const hashPassword = await bcrypt.hash(signupInput.password, 10);
        await this.prisma.user.create({
            data: {
                emailAddress: signupInput.emailAddress,
                name: signupInput.name,
                password: hashPassword,
            },
        });
        return 'Signup Successful';
    }
}
