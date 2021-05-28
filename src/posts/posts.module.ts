import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
    imports: [PrismaModule],
    providers: [PostsService, PostsResolver],
})
export class PostsModule {}
