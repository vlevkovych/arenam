import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ValidationError } from '../common/errors/validation.error';
import { PrismaService } from '../config/prisma/prisma.service';

import { signupInputValidationSchema } from './validation/signup.input.validation';

import type { JwtDto } from './dto/jwt.dto';
import type { LoginInput } from './dto/login.input';
import type { SignupInput } from './dto/signup.input';
import type { SignupPayload } from './dto/signup.payload';
import type { User } from '@prisma/client';

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

    public async login(input: LoginInput): Promise<string> {
        const foundUser = await this.prisma.user.findUnique({
            where: { emailAddress: input.emailAddress },
        });
        if (!foundUser) {
            throw new BadRequestException('Wrong email or password');
        }
        const passwordValid = await AuthService.validate(
            input.password,
            foundUser.password,
        );
        if (!passwordValid) {
            throw new BadRequestException('Wrong email or password');
        }
        return `You are logged in, your token: ${this.signToken(foundUser.id)}`;
    }

    public async register(input: SignupInput): Promise<SignupPayload> {
        const validationPayload = await this.signupValidation(input);
        if (validationPayload !== null) {
            return validationPayload;
        }
        const hashPassword = await bcrypt.hash(input.password, 10);
        await this.prisma.user.create({
            data: {
                ...input,
                password: hashPassword,
            },
        });
        return {
            errors: [],
            isSignupSuccessful: true,
        };
    }

    public async validateUser(userId: number): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { id: userId } });
    }

    private async signupValidation(
        input: SignupInput,
    ): Promise<SignupPayload | null> {
        const foundUser = await this.prisma.user.findFirst({
            where: { emailAddress: input.emailAddress },
        });

        if (foundUser) {
            return {
                errors: [
                    {
                        field: ['emailAddress'],
                        message: 'User with same email is already exist',
                    },
                ],
                isSignupSuccessful: false,
            };
        }
        try {
            await signupInputValidationSchema.validateAsync(input);
        } catch (error: unknown) {
            Logger.log(error);
            if (error instanceof ValidationError) {
                return {
                    errors: [
                        {
                            field: [error.fieldName],
                            message: error.message,
                        },
                    ],
                    isSignupSuccessful: false,
                };
            }
            throw error;
        }
        return null;
    }

    private signToken(id: number): string {
        const payload: JwtDto = { userId: id };
        return this.jwt.sign(payload);
    }
}
