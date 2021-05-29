import { UseGuards } from '@nestjs/common';
import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from '../user/user.models';
import { UserService } from '../user/user.service';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './posts.models';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
    public constructor(
        private readonly postsService: PostsService,
        private readonly userService: UserService,
    ) {}

    @Query(() => Post)
    public async getPost(
        @Args('id', { nullable: true }) id: number,
    ): Promise<Post> {
        return this.postsService.getPostById(id);
    }

    @Mutation(() => String)
    @UseGuards(GqlAuthGuard)
    public async createPost(
        @Args('input') input: CreatePostInput,
        @CurrentUser() creator: User,
    ): Promise<string> {
        return this.postsService.createPost(input, creator);
    }

    @Mutation(() => String)
    @UseGuards(GqlAuthGuard)
    public async deletePost(
        @Args('postId') postId: number,
        @CurrentUser() user: User,
    ): Promise<string> {
        const userId = user.id;
        return this.postsService.deletePost(postId, userId);
    }

    @ResolveField('creator', () => User)
    public async getCreator(@Parent() post: Post): Promise<User> {
        const { creatorId } = post;
        return this.userService.getUserById(creatorId);
    }
}
