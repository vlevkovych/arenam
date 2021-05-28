import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../config/prisma/prisma.service';
import type { JwtDto } from './dto/jwt.dto';
import type { LoginInput } from './dto/login.input';
import type { SignupInput } from './dto/signup.input';
import { signupInputValidationSchema } from './validation/signup.input.validation';

@Injectable()
export class AuthService {
    public constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) {}

    private static async validate(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    public async login(loginInput: LoginInput): Promise<string> {
        const foundUser = await this.prisma.user.findUnique({
            where: { emailAddress: loginInput.emailAddress },
        });
        if (!foundUser) {
            throw new BadRequestException('Wrong email or password');
        }
        const passwordValid = await AuthService.validate(
            loginInput.password,
            foundUser.password,
        );
        if (!passwordValid) {
            throw new BadRequestException('Wrong email or password');
        }
        return `You are logged in, your token: ${this.signToken(foundUser.id)}`;
    }

    public async register(signupInput: SignupInput): Promise<string> {
        const foundUser = await this.prisma.user.findFirst({
            where: { emailAddress: signupInput.emailAddress },
        });
        if (foundUser) {
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
                ...signupInput,
                password: hashPassword,
            },
        });
        return 'Signup Successful';
    }

    public async validateUser(userId: number): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { id: userId } });
    }

    private signToken(id: number): string {
        const payload: JwtDto = { userId: id };
        return this.jwt.sign(payload);
    }
}
