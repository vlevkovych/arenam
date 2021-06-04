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
import { GqlAnonymousGuard } from '../auth/guards/gql-anonymous.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Comment } from '../comments/comments.models';
import { CommentsService } from '../comments/comments.service';
import { RatePayload } from '../rating/dto/rate.payload';
import { RatingStatus } from '../rating/dto/rating-status.enum';
import { RatingService } from '../rating/rating.service';
import { User } from '../user/user.models';

import { CreatePostInput } from './dto/create-post.input';
import { CreatePostPayload } from './dto/create-post.payload';
import { DeletePostPayload } from './dto/delete-post.payload';
import { UpdatePostInput } from './dto/update-post.input';
import { UpdatePostPayload } from './dto/update-post.payload';
import PostsLoaders from './posts.loader';
import { Post } from './posts.models';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
    public constructor(
        private readonly postsService: PostsService,
        private readonly postsLoaders: PostsLoaders,
        private readonly commentsService: CommentsService,
        private readonly ratingService: RatingService,
    ) {}

    @Query(() => Post, { nullable: true })
    @UseGuards(GqlAnonymousGuard)
    public async getPost(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<Post> {
        return this.postsService.getPostById(id);
    }

    @Query(() => [Post])
    @UseGuards(GqlAnonymousGuard)
    public async getPosts(): Promise<Post[]> {
        return this.postsService.getPosts();
    }

    @Mutation(() => CreatePostPayload)
    @UseGuards(GqlAuthGuard)
    public async createPost(
        @Args('input') input: CreatePostInput,
        @CurrentUser() user: User,
    ): Promise<CreatePostPayload> {
        const userId = user.id;
        return this.postsService.createPost(input, userId);
    }

    @Mutation(() => UpdatePostPayload)
    @UseGuards(GqlAuthGuard)
    public async updatePost(
        @Args('id', { type: () => Int }) id: number,
        @Args('input') input: UpdatePostInput,
        @CurrentUser() user: User,
    ): Promise<UpdatePostPayload> {
        const userId = user.id;
        return this.postsService.updatePost(id, input, userId);
    }

    @Mutation(() => DeletePostPayload)
    @UseGuards(GqlAuthGuard)
    public async deletePost(
        @Args('postId', { type: () => Int }) postId: number,
        @CurrentUser() user: User,
    ): Promise<DeletePostPayload> {
        const userId = user.id;
        return this.postsService.deletePost(postId, userId);
    }

    @Mutation(() => RatePayload)
    @UseGuards(GqlAuthGuard)
    public async upvotePost(
        @Args('postId', { type: () => Int }) postId: number,
        @CurrentUser() user: User,
    ): Promise<RatePayload> {
        const userId = user.id;
        return this.ratingService.changePostRatingStatus(
            postId,
            userId,
            RatingStatus.upvoted,
        );
    }

    @Mutation(() => RatePayload)
    @UseGuards(GqlAuthGuard)
    public async downvotePost(
        @Args('postId', { type: () => Int }) postId: number,
        @CurrentUser() user: User,
    ): Promise<RatePayload> {
        const userId = user.id;
        return this.ratingService.changePostRatingStatus(
            postId,
            userId,
            RatingStatus.downvoted,
        );
    }

    @Mutation(() => RatePayload)
    @UseGuards(GqlAuthGuard)
    public async removeRatingFromPost(
        @Args('postId', { type: () => Int }) postId: number,
        @CurrentUser() user: User,
    ): Promise<RatePayload> {
        const userId = user.id;
        return this.ratingService.changePostRatingStatus(
            postId,
            userId,
            RatingStatus.neutral,
        );
    }

    @ResolveField('creator', () => User)
    public async getCreator(@Parent() post: Post): Promise<User> {
        const { creatorId } = post;
        return this.postsLoaders.batchCreators.load(creatorId);
    }

    @ResolveField('comments', () => [Comment])
    public async getComments(@Parent() post: Post): Promise<Comment[]> {
        const postId = post.id;
        return this.commentsService.getCommentsByPostId(postId);
    }

    @ResolveField('myRatingStatus', () => RatingStatus)
    public async getMyRatingStatus(
        @Parent() post: Post,
        @CurrentUser() user: User | null,
    ): Promise<string> {
        if (user !== null) {
            const postId = post.id;
            const userId = user.id;
            return this.ratingService.getMyPostRatingStatus(postId, userId);
        }
        return RatingStatus.neutral;
    }
}
