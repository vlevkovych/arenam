import { Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../config/prisma/prisma.service';
import type { CreatePostInput } from './dto/create-post.input';
import type { Post } from './posts.models';

@Injectable()
export class PostsService {
    public constructor(private readonly prisma: PrismaService) {}

    public async getPost(id: number): Promise<Post> {
        const post = await this.prisma.post.findFirst({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    public async createPost(
        input: CreatePostInput,
        creator: User,
    ): Promise<string> {
        await this.prisma.post.create({
            data: {
                body: input.body,
                creatorId: creator.id,
                title: input.title,
            },
        });
        return 'Post successfully created';
    }

    public async deletePost(postId: number, creator: User): Promise<string> {
        const post = await this.prisma.post.findFirst({
            where: {
                creatorId: creator.id,
                id: postId,
            },
        });
        if (post) {
            await this.prisma.post.delete({ where: { id: post.id } });
            return 'Post successfully deleted';
        }
        return 'Post does not exist or you are not the author';
    }

    public async getUserPosts(id: number): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            where: { creatorId: id },
        });
        if (posts.length === 0) {
            return [];
        }
        return posts;
    }
}
