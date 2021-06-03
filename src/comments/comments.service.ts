import { Injectable } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

import type { Comment } from './comments.models';
import type { CreateCommentInput } from './dto/create-comment.input';
import type { NewReplyPayload } from './dto/new-reply.payload';

@Injectable()
export class CommentsService {
    public constructor(private readonly prisma: PrismaService) {}

    public async replyToPost(
        postId: number,
        creatorId: number,
        input: CreateCommentInput,
    ): Promise<NewReplyPayload> {
        const comment = await this.prisma.comment.create({
            data: {
                creatorId,
                postId,
                text: input.text,
            },
        });
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
        const comment = await this.prisma.comment.create({
            data: {
                creatorId,
                repliedToId: commentId,
                text: input.text,
            },
        });
        return {
            comment,
            errors: [],
        };
    }

    public async getCommentsByPostId(postId: number): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: {
                postId,
            },
        });
    }

    public async getRepliesToComment(id: number): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: {
                repliedToId: id,
            },
        });
    }

    public async getCommentsByIds(keys: readonly number[]): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: {
                id: {
                    in: [...keys],
                },
            },
        });
    }
}
