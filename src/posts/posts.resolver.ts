import { UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from '../user/user.models';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import PostsLoaders from './posts.loader';
import { Post } from './posts.models';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
    public constructor(
        private readonly postsService: PostsService,
        private readonly postsLoaders: PostsLoaders,
    ) {}

    @Query(() => Post, { nullable: true })
    public async getPost(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Post> {
        return this.postsService.getPostById(id);
    }

    @Query(() => [Post])
    public async getPosts(): Promise<Post[]> {
        return this.postsService.getPosts();
    }

    @Mutation(() => String)
    @UseGuards(GqlAuthGuard)
    public async createPost(
        @Args('input') input: CreatePostInput,
        @CurrentUser() user: User,
    ): Promise<string> {
        const userId = user.id;
        return this.postsService.createPost(input, userId);
    }

    @Mutation(() => String)
    @UseGuards(GqlAuthGuard)
    public async updatePost(
        @Args('id', { type: () => Int }) id: number,
        @Args('input') input: UpdatePostInput,
        @CurrentUser() user: User,
    ): Promise<string> {
        const userId = user.id;
        return this.postsService.updatePost(id, input, userId);
    }

    @Mutation(() => String)
    @UseGuards(GqlAuthGuard)
    public async deletePost(
        @Args('postId', { type: () => Int }) postId: number,
        @CurrentUser() user: User,
    ): Promise<string> {
        const userId = user.id;
        return this.postsService.deletePost(postId, userId);
    }

    @ResolveField('creator', () => User)
    public async getCreator(@Parent() post: Post): Promise<User | undefined> {
        const { creatorId } = post;
        return this.postsLoaders.batchCreators.load(creatorId);
    }
}
