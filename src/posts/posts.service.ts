import { Injectable, NotFoundException } from '@nestjs/common';
import { RatingStatus } from '@prisma/client';

import { PrismaService } from '../config/prisma/prisma.service';

import type { CreatePostInput } from './dto/create-post.input';
import type { UpdatePostInput } from './dto/update-post.input';
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
    ): Promise<string> {
        await this.prisma.post.create({
            data: {
                ...input,
                creatorId,
            },
        });
        return 'Post successfully created';
    }

    public async updatePost(
        postId: number,
        input: UpdatePostInput,
        creatorId: number,
    ): Promise<string> {
        const post = await this.prisma.post.findFirst({
            where: {
                creatorId,
                id: postId,
            },
        });
        if (!post) {
            return 'Post does not exist or you are not the author ';
        }
        await this.prisma.post.update({
            data: input,
            where: {
                id: postId,
            },
        });
        return 'Post successfully updated';
    }

    public async deletePost(postId: number, userId: number): Promise<string> {
        const post = await this.prisma.post.findFirst({
            where: {
                creatorId: userId,
                id: postId,
            },
        });
        if (!post) {
            return 'Post does not exist or you are not the author';
        }
        await this.prisma.post.delete({ where: { id: post.id } });
        return 'Post successfully deleted';
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
    ): Promise<string> {
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
            return 'Nothing changed';
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
            update: {
                rating: ratingStatus,
            },
            where: {
                UserAndPostIds: {
                    postId,
                    userId,
                },
            },
        });
        return `Post rating set to ${ratingStatus}`;
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
