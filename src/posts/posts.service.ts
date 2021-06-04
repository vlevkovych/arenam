import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../config/prisma/prisma.service';

import type { CreatePostInput } from './dto/create-post.input';
import type { CreatePostPayload } from './dto/create-post.payload';
import type { DeletePostPayload } from './dto/delete-post.payload';
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

    public async getPostsByIds(keys: readonly number[]): Promise<Post[]> {
        return this.prisma.post.findMany({
            where: {
                id: {
                    in: [...keys],
                },
            },
        });
    }
}
