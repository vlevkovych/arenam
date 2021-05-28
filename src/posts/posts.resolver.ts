import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CreatePostInput } from './dto/create-post.input';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
    public constructor(private readonly postsService: PostsService) {}

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
        @CurrentUser() creator: User,
    ): Promise<string> {
        return this.postsService.deletePost(postId, creator);
    }
}
