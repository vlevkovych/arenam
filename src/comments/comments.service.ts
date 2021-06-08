import { Injectable } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';

import type { Comment } from './comments.models';
import type { CreateCommentInput } from './dto/create-comment.input';
import type { NewReplyPayload } from './dto/new-reply.payload';

@Injectable()
export class CommentsService {
    public constructor(
        private readonly commentsRepository: CommentsRepository,
    ) {}

    public async replyToPost(
        postId: number,
        creatorId: number,
        input: CreateCommentInput,
    ): Promise<NewReplyPayload> {
        const { text } = input;
        const comment = await this.commentsRepository.createCommentToPost(
            creatorId,
            postId,
            text,
        );
        return {
            comment,
            errors: [],
        };
    }

    public async replyToComment(
        commentId: number,
        creatorId: number,
        input: CreateCommentInput,
    ): Promise<NewReplyPayload> {
        const { text } = input;
        const comment = await this.commentsRepository.createCommentToComment(
            creatorId,
            commentId,
            text,
        );
        return {
            comment,
            errors: [],
        };
    }

    public async getCommentsByPostId(postId: number): Promise<Comment[]> {
        return this.commentsRepository.findCommentsByPostId(postId);
    }

    public async getRepliesToComment(id: number): Promise<Comment[]> {
        return this.commentsRepository.findRepliesToComment(id);
    }
}
