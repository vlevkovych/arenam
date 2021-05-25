import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

    @Query(() => User)
    public async getUser(@Args('id') id: number): Promise<User | null> {
        const user = await this.userService.getUser(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
}
