import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from '../user/user.models';

import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { NewReplyPayload } from './dto/new-reply.payload';

@Resolver(() => NewReplyPayload)
export class CommentsResolver {
    public constructor(private readonly commentsService: CommentsService) {}

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
}
