import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginPayload } from './dto/login.payload';
import { SignupInput } from './dto/signup.input';
import { SignupPayload } from './dto/signup.payload';

@Resolver()
export class AuthResolver {
    public constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginPayload)
    public async login(
        @Args('input') input: LoginInput,
    ): Promise<LoginPayload> {
        return this.authService.login(input);
    }

    @Mutation(() => SignupPayload)
    public async signUp(
        @Args('input') input: SignupInput,
    ): Promise<SignupPayload> {
        return this.authService.register(input);
    }
}
