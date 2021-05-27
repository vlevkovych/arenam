import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.models';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    public constructor(private readonly userService: UserService) {}

    @Query(() => User, { nullable: true })
    public async getUser(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<User> {
        return this.userService.getUser(id);
    }
}
