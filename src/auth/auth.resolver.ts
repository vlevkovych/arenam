import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

@Resolver()
export class AuthResolver {
    public constructor(private readonly authService: AuthService) {}

    @Mutation(() => String)
    public async login(@Args('input') input: LoginInput): Promise<string> {
        return this.authService.login(input);
    }

    @Mutation(() => String)
    public async signUp(@Args('input') input: SignupInput): Promise<string> {
        return this.authService.register(input);
    }
}
