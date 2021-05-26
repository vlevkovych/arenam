import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignupInput } from './dto/signup.input';
import { User } from './user.models';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    public constructor(private readonly userService: UserService) {}

    @Mutation(() => String)
    public async signUp(
        @Args('signupInput') signupInput: SignupInput,
    ): Promise<string> {
        return this.userService.createUser(signupInput);
    }

    @Query(() => User, { nullable: true })
    public async getUser(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<User> {
        return this.userService.getUser(id);
    }
}
