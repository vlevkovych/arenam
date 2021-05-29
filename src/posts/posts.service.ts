import { Injectable, NotFoundException } from '@nestjs/common';

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
}
