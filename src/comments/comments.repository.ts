import { Injectable } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class CommentsRepository {
    public constructor(private readonly prisma: PrismaService) {}

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
