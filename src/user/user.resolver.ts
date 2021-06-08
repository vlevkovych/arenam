import { UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAnonymousGuard } from '../auth/guards/gql-anonymous.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Post } from '../posts/posts.models';
import { PostsService } from '../posts/posts.service';

import { User } from './user.models';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
    public constructor(
        private readonly userService: UserService,
        private readonly postsService: PostsService,
    ) {}

    @Query(() => User, { nullable: true })
    @UseGuards(GqlAnonymousGuard)
    public async getUser(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    public async getMyProfile(@CurrentUser() user: User): Promise<User> {
        return this.userService.getUserById(user.id);
    }

    @ResolveField('posts', () => [Post])
    public async getUserPosts(@Parent() user: User): Promise<Post[]> {
        return this.postsService.getUserPosts(user.id);
    }
}
