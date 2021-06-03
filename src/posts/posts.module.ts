import { Module, forwardRef } from '@nestjs/common';

import { CommentsModule } from '../comments/comments.module';
import { PrismaModule } from '../config/prisma/prisma.module';
import { UserModule } from '../user/user.module';

import PostsLoaders from './posts.loader';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
    exports: [PostsService],
    imports: [
        PrismaModule,
        forwardRef(() => UserModule),
        forwardRef(() => CommentsModule),
    ],
    providers: [PostsService, PostsResolver, PostsLoaders],
})
export class PostsModule {}
