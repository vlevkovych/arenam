import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

@Resolver()
export class AuthResolver {
    public constructor(private readonly authService: AuthService) {}

    @Mutation(() => String)
    public async login(
        @Args('loginInput') loginInput: LoginInput,
    ): Promise<string> {
        return this.authService.login(loginInput);
    }

    @Mutation(() => String)
    public async signUp(
        @Args('signupInput') signupInput: SignupInput,
    ): Promise<string> {
        return this.authService.register(signupInput);
    }
}
