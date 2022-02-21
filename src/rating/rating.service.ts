import { Injectable } from '@nestjs/common';
import { RatingStatus } from '@prisma/client';

import { CommentsRepository } from '../comments/comments.repository';
import { PostsRepository } from '../posts/posts.repository';

import { RatingRepository } from './rating.repository';

import type { RatePayload } from './dto/rate.payload';

@Injectable()
export class RatingService {
    public constructor(
        private readonly ratingRepository: RatingRepository,
        private readonly commentsRepository: CommentsRepository,
        private readonly postsRepository: PostsRepository,
    ) {}

    private static getRatingIncrement(
        previousStatus: RatingStatus,
        newStatus: RatingStatus,
    ): number {
        const { upvoted, downvoted, neutral } = RatingStatus;

        if (previousStatus === upvoted && newStatus === downvoted) {
            return -2;
        }

        if (previousStatus === downvoted && newStatus === upvoted) {
            return 2;
        }

        if (
            (previousStatus === downvoted && newStatus === neutral) ||
            (previousStatus === neutral && newStatus === upvoted)
        ) {
            return 1;
        }

        return -1;
    }

    public async changePostRatingStatus(
        postId: number,
        userId: number,
        ratingStatus: RatingStatus,
    ): Promise<RatePayload> {
        const previousStatus = await this.ratingRepository.findPostRating(
            postId,
            userId,
        );
        if (previousStatus && previousStatus.rating === ratingStatus) {
            return {
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
        await this.ratingRepository.upsertPostRating(
            userId,
            postId,
            ratingStatus,
        );
        return {
            isRateSuccessful: true,
        };
    }

    public async changeCommentRatingStatus(
        commentId: number,
        userId: number,
        ratingStatus: RatingStatus,
    ): Promise<RatePayload> {
        const previousStatus = await this.ratingRepository.findCommentRating(
            userId,
            commentId,
        );
        if (previousStatus && previousStatus.rating === ratingStatus) {
            return {
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
        await this.ratingRepository.upsertCommentRating(
            userId,
            commentId,
            ratingStatus,
        );
        return {
            isRateSuccessful: true,
        };
    }

    public async getMyPostRatingStatus(
        postId: number,
        userId: number,
    ): Promise<RatingStatus> {
        const rating = await this.ratingRepository.findPostRating(
            postId,
            userId,
        );
        if (rating) {
            return rating.rating;
        }
        return RatingStatus.neutral;
    }

    public async getMyCommentRatingStatus(
        commentId: number,
        userId: number,
    ): Promise<RatingStatus> {
        const rating = await this.ratingRepository.findCommentRating(
            commentId,
            userId,
        );
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
        const incrementRating = RatingService.getRatingIncrement(
            previousStatus,
            newStatus,
        );

        await this.postsRepository.incrementRatingById(postId, incrementRating);
    }

    private async changeCommentRating(
        commentId: number,
        previousStatus: RatingStatus,
        newStatus: RatingStatus,
    ): Promise<void> {
        const incrementRating = RatingService.getRatingIncrement(
            previousStatus,
            newStatus,
        );

        await this.commentsRepository.incrementRatingById(
            commentId,
            incrementRating,
        );
    }
}
