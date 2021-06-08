import { Injectable } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

import type { Comment } from '@prisma/client';

@Injectable()
export class CommentsRepository {
    public constructor(private readonly prisma: PrismaService) {}

    public async createCommentToPost(
        creatorId: number,
        postId: number,
        text: string,
    ): Promise<Comment> {
        return this.prisma.comment.create({
            data: {
                creatorId,
                postId,
                text,
            },
        });
    }

    public async createCommentToComment(
        creatorId: number,
        commentId: number,
        text: string,
    ): Promise<Comment> {
        return this.prisma.comment.create({
            data: {
                creatorId,
                repliedToId: commentId,
                text,
            },
        });
    }

    public async findCommentsByPostId(postId: number): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: {
                postId,
            },
        });
    }

    public async findRepliesToComment(id: number): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: {
                repliedToId: id,
            },
        });
    }

    public async findCommentsByIds(
        keys: readonly number[],
    ): Promise<Comment[]> {
        return this.prisma.comment.findMany({
            where: {
                id: {
                    in: [...keys],
                },
            },
        });
    }

    public async incrementRatingById(
        commentId: number,
        incrementRating: number,
    ): Promise<void> {
        await this.prisma.comment.update({
            data: {
                rating: {
                    increment: incrementRating,
                },
            },
            where: {
                id: commentId,
            },
        });
    }
}
