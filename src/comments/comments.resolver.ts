import { Logger, UseGuards } from '@nestjs/common';
import {
    Args,
    Int,
    Mutation,
    Parent,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Post } from '../posts/posts.models';
import { User } from '../user/user.models';

import CommentsLoader from './comments.loader';
import { Comment } from './comments.models';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { NewReplyPayload } from './dto/new-reply.payload';

@Resolver(() => Comment)
export class CommentsResolver {
    public constructor(
        private readonly commentsService: CommentsService,
        private readonly commentsLoader: CommentsLoader,
    ) {}

    @Mutation(() => NewReplyPayload)
    @UseGuards(GqlAuthGuard)
    public async replyToPost(
        @Args('postId', { type: () => Int }) postId: number,
        @Args('input') input: CreateCommentInput,
        @CurrentUser() user: User,
    ): Promise<NewReplyPayload> {
        const userId = user.id;
        return this.commentsService.replyToPost(postId, userId, input);
    }

    @Mutation(() => NewReplyPayload)
    @UseGuards(GqlAuthGuard)
    public async replyToComment(
        @Args('commentId', { type: () => Int }) commentId: number,
        @Args('input') input: CreateCommentInput,
        @CurrentUser() user: User,
    ): Promise<NewReplyPayload> {
        const userId = user.id;
        return this.commentsService.replyToComment(commentId, userId, input);
    }

    @ResolveField('replies', () => [Comment])
    public async replies(@Parent() comment: Comment): Promise<Comment[]> {
        const { id } = comment;
        return this.commentsService.getRepliesToComment(id);
    }

    @ResolveField('creator', () => User)
    public async getCommentCreator(@Parent() comment: Comment): Promise<User> {
        const { creatorId } = comment;
        return this.commentsLoader.batchCreators.load(creatorId);
    }

    @ResolveField('repliedTo', () => Comment)
    public async repliedTo(
        @Parent() comment: Comment,
    ): Promise<Comment | null> {
        const { repliedToId } = comment;
        Logger.debug(repliedToId);
        if (repliedToId !== null) {
            return this.commentsLoader.batchRepliedTo.load(repliedToId);
        }
        return null;
    }

    @ResolveField('post', () => Post)
    public async post(@Parent() comment: Comment): Promise<Post | null> {
        const { postId } = comment;
        if (postId !== null) {
            return this.commentsLoader.batchPosts.load(postId);
        }
        return null;
    }
}
