import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingStatus } from '@prisma/client';

import { PrismaService } from '../config/prisma/prisma.service';

import type { CreatePostInput } from './dto/create-post.input';
import type { CreatePostPayload } from './dto/create-post.payload';
import type { DeletePostPayload } from './dto/delete-post.payload';
import type { RatePostPayload } from './dto/rate-post.payload';
import type { UpdatePostInput } from './dto/update-post.input';
import type { UpdatePostPayload } from './dto/update-post.payload';
import type { Post } from './posts.models';

@Injectable()
export class PostsService {
    public constructor(private readonly prisma: PrismaService) {}

    public async getPostById(id: number): Promise<Post> {
        const post = await this.prisma.post.findFirst({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    public async createPost(
        input: CreatePostInput,
        creatorId: number,
    ): Promise<CreatePostPayload> {
        const post = await this.prisma.post.create({
            data: {
                ...input,
                creatorId,
            },
        });
        return {
            errors: [],
            post,
        };
    }

    public async updatePost(
        postId: number,
        input: UpdatePostInput,
        creatorId: number,
    ): Promise<UpdatePostPayload> {
        const post = await this.prisma.post.findFirst({
            where: {
                creatorId,
                id: postId,
            },
        });
        if (!post) {
            return {
                errors: [
                    {
                        field: [],
                        message:
                            'Post does not exist or you are not the author',
                    },
                ],
            };
        }
        const updatedPost = await this.prisma.post.update({
            data: input,
            where: {
                id: postId,
            },
        });
        return {
            errors: [],
            post: updatedPost,
        };
    }

    public async deletePost(
        postId: number,
        userId: number,
    ): Promise<DeletePostPayload> {
        const post = await this.prisma.post.findFirst({
            where: {
                creatorId: userId,
                id: postId,
            },
        });
        if (!post) {
            return {
                errors: [
                    {
                        field: [],
                        message:
                            'Post does not exist or you are not the author',
                    },
                ],
                isDeleteSuccessful: false,
            };
        }
        await this.prisma.post.delete({ where: { id: post.id } });
        return {
            errors: [],
            isDeleteSuccessful: true,
        };
    }

    public async getPostsByUserId(id: number): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: { creatorId: id },
        });
    }

    public async getPosts(): Promise<Post[]> {
        return this.prisma.post.findMany();
    }

    public async changeRatingStatus(
        postId: number,
        userId: number,
        ratingStatus: RatingStatus,
    ): Promise<RatePostPayload> {
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

    public async getMyRatingStatus(
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

    private async changePostRating(
        postId: number,
        previousStatus: RatingStatus,
        newStatus: RatingStatus,
    ): Promise<void> {
        let incrementRating = -1;
        if (
            previousStatus === RatingStatus.upvoted &&
            newStatus === RatingStatus.downvoted
        ) {
            incrementRating = -2;
        } else if (
            previousStatus === RatingStatus.downvoted &&
            newStatus === RatingStatus.upvoted
        ) {
            incrementRating = 2;
        } else if (
            (previousStatus === RatingStatus.downvoted &&
                newStatus === RatingStatus.neutral) ||
            (previousStatus === RatingStatus.neutral &&
                newStatus === RatingStatus.upvoted)
        ) {
            incrementRating = 1;
        }
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
