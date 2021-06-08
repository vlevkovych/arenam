import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ValidationError } from '../common/errors/validation.error';
import { UserRepository } from '../user/user.repository';

import { signupInputValidationSchema } from './validation/signup.input.validation';

import type { JwtDto } from './dto/jwt.dto';
import type { LoginInput } from './dto/login.input';
import type { LoginPayload } from './dto/login.payload';
import type { SignupInput } from './dto/signup.input';
import type { SignupPayload } from './dto/signup.payload';
import type { User } from '@prisma/client';

@Injectable()
export class AuthService {
    public constructor(
        private readonly userRepository: UserRepository,
        private readonly jwt: JwtService,
    ) {}

    private static async validate(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    public async login(input: LoginInput): Promise<LoginPayload> {
        const foundUser = await this.userRepository.findUserByEmail(
            input.emailAddress,
        );
        const validationErrorPayload = {
            errors: [
                {
                    field: ['emailAddress', 'password'],
                    message: 'Wrong email or password',
                },
            ],
            isLoginSuccessful: false,
        };
        if (!foundUser) {
            return validationErrorPayload;
        }
        const passwordValid = await AuthService.validate(
            input.password,
            foundUser.password,
        );
        if (!passwordValid) {
            return validationErrorPayload;
        }
        return {
            errors: [],
            isLoginSuccessful: true,
            jwtToken: this.signToken(foundUser.id),
        };
    }

    public async register(input: SignupInput): Promise<SignupPayload> {
        const validationPayload = await this.signupValidation(input);
        if (validationPayload !== null) {
            return validationPayload;
        }
        const hashPassword = await bcrypt.hash(input.password, 10);
        await this.userRepository.createUser({
            ...input,
            password: hashPassword,
        });
        return {
            errors: [],
            isSignupSuccessful: true,
        };
    }

    public async validateUser(userId: number): Promise<User | null> {
        return this.userRepository.findUserById(userId);
    }

    private async signupValidation(
        input: SignupInput,
    ): Promise<SignupPayload | null> {
        const foundUser = await this.userRepository.findUserByEmail(
            input.emailAddress,
        );

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
