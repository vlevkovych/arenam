import { Injectable } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

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
}
