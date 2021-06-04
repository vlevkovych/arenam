import { Injectable } from '@nestjs/common';
import { RatingStatus } from '@prisma/client';

import { PrismaService } from '../config/prisma/prisma.service';

import type { RatePayload } from './dto/rate.payload';

@Injectable()
export class RatingService {
    public constructor(private readonly prisma: PrismaService) {}

    public async changePostRatingStatus(
        postId: number,
        userId: number,
        ratingStatus: RatingStatus,
    ): Promise<RatePayload> {
        const previousStatus = await this.prisma.postRating.findUnique({
            select: {
                rating: true,
            },
            where: {
                UserAndPostIds: {
                    postId,
                    userId,
                },
            },
        });
        if (previousStatus && previousStatus.rating === ratingStatus) {
            return {
                errors: [],
                isRateSuccessful: true,
            };
        }
        if (previousStatus === null) {
            await this.changePostRating(
                postId,
                RatingStatus.neutral,
                ratingStatus,
            );
        } else {
            await this.changePostRating(
                postId,
                previousStatus.rating,
                ratingStatus,
            );
        }
        await this.prisma.postRating.upsert({
            create: {
                postId,
                rating: ratingStatus,
                userId,
            },
            update: { rating: ratingStatus },
            where: { UserAndPostIds: { postId, userId } },
        });
        return {
            errors: [],
            isRateSuccessful: true,
        };
    }

    public async changeCommentRatingStatus(
        commentId: number,
        userId: number,
        ratingStatus: RatingStatus,
    ): Promise<RatePayload> {
        const previousStatus = await this.prisma.commentRating.findUnique({
            select: {
                rating: true,
            },
            where: {
                UserAndCommentIds: {
                    commentId,
                    userId,
                },
            },
        });
        if (previousStatus && previousStatus.rating === ratingStatus) {
            return {
                errors: [],
                isRateSuccessful: true,
            };
        }
        if (previousStatus === null) {
            await this.changeCommentRating(
                commentId,
                RatingStatus.neutral,
                ratingStatus,
            );
        } else {
            await this.changeCommentRating(
                commentId,
                previousStatus.rating,
                ratingStatus,
            );
        }
        await this.prisma.commentRating.upsert({
            create: {
                commentId,
                rating: ratingStatus,
                userId,
            },
            update: { rating: ratingStatus },
            where: { UserAndCommentIds: { commentId, userId } },
        });
        return {
            errors: [],
            isRateSuccessful: true,
        };
    }

    public async getMyPostRatingStatus(
        postId: number,
        userId: number,
    ): Promise<RatingStatus> {
        const rating = await this.prisma.postRating.findFirst({
            select: {
                rating: true,
            },
            where: {
                postId,
                userId,
            },
        });
        if (rating) {
            return rating.rating;
        }
        return RatingStatus.neutral;
    }

    public async getMyCommentRatingStatus(
        commentId: number,
        userId: number,
    ): Promise<RatingStatus> {
        const rating = await this.prisma.commentRating.findFirst({
            select: {
                rating: true,
            },
            where: {
                commentId,
                userId,
            },
        });
        if (rating) {
            return rating.rating;
        }
        return RatingStatus.neutral;
    }

    private async changePostRating(
        postId: number,
        previousStatus: RatingStatus,
        newStatus: RatingStatus,
    ): Promise<void> {
        const incrementRating = this.getRatingIncrement(
            previousStatus,
            newStatus,
        );
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

    private async changeCommentRating(
        commentId: number,
        previousStatus: RatingStatus,
        newStatus: RatingStatus,
    ): Promise<void> {
        const incrementRating = this.getRatingIncrement(
            previousStatus,
            newStatus,
        );
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

    private getRatingIncrement(
        previousStatus: RatingStatus,
        newStatus: RatingStatus,
    ): number {
        if (
            previousStatus === RatingStatus.upvoted &&
            newStatus === RatingStatus.downvoted
        ) {
            return -2;
        } else if (
            previousStatus === RatingStatus.downvoted &&
            newStatus === RatingStatus.upvoted
        ) {
            return 2;
        } else if (
            (previousStatus === RatingStatus.downvoted &&
                newStatus === RatingStatus.neutral) ||
            (previousStatus === RatingStatus.neutral &&
                newStatus === RatingStatus.upvoted)
        ) {
            return 1;
        }
        return -1;
    }
}
