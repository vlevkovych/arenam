import { Injectable } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class PostsRepository {
    public constructor(private readonly prisma: PrismaService) {}

    public async incrementRatingById(
        postId: number,
        incrementRating: number,
    ): Promise<void> {
        await this.prisma.post.update({
            data: {
                rating: {
                    increment: incrementRating,
                },
            },
            where: {
                id: postId,
            },
        });
    }
}
