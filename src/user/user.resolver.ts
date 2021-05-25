import { Query, Resolver } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    public constructor(private readonly userService: UserService) {}

    @Query(() => GraphQLString)
    public hello(): string {
        return this.userService.helloWorld();
    }
}
