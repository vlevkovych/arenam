import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../config/prisma/prisma.service';
import type { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
    public constructor(private readonly prisma: PrismaService) {}

    public async createPost(
        input: CreatePostInput,
        creator: User,
    ): Promise<string> {
        await this.prisma.post.create({
            data: {
                body: input.body,
                creator: creator.id,
                title: input.title,
            },
        });
        return 'Post successfully created';
    }

    public async deletePost(postId: number, creator: User): Promise<string> {
        const post = await this.prisma.post.findFirst({
            where: {
                creator: creator.id,
                id: postId,
            },
        });
        if (post) {
            await this.prisma.post.delete({ where: { id: post.id } });
            return 'Post successfully deleted';
        }
        return 'Post does not exist or you are not the author';
    }
}
