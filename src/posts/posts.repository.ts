import { Injectable } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

import type { CreatePostInput } from './dto/create-post.input';
import type { UpdatePostInput } from './dto/update-post.input';
import type { Post } from '@prisma/client';

@Injectable()
export class PostsRepository {
    public constructor(private readonly prisma: PrismaService) {}

    public async createPost(
        input: CreatePostInput,
        creatorId: number,
    ): Promise<Post> {
        return this.prisma.post.create({
            data: {
                ...input,
                creatorId,
            },
        });
    }

    public async findPostById(postId: number): Promise<Post | null> {
        return this.prisma.post.findUnique({ where: { id: postId } });
    }

    public async findPostByCreatorId(
        creatorId: number,
        postId: number,
    ): Promise<Post | null> {
        return this.prisma.post.findFirst({ where: { creatorId, id: postId } });
    }

    public async findPostsByUserId(id: number): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: { creatorId: id },
        });
    }

    public async findPosts(): Promise<Post[]> {
        return this.prisma.post.findMany();
    }

    public async findPostsByIds(keys: readonly number[]): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: {
                id: {
                    in: [...keys],
                },
            },
        });
    }

    public async updatePost(
        postId: number,
        input: UpdatePostInput,
    ): Promise<Post | null> {
        return this.prisma.post.update({
            data: input,
            where: {
                id: postId,
            },
        });
    }

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

    public async deletePostById(postId: number): Promise<void> {
        await this.prisma.post.delete({ where: { id: postId } });
    }
}
