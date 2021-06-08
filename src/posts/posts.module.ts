import { Module, forwardRef } from '@nestjs/common';

import { CommentsModule } from '../comments/comments.module';
import { PrismaModule } from '../config/prisma/prisma.module';
import { RatingModule } from '../rating/rating.module';
import { UserModule } from '../user/user.module';

import PostsLoaders from './posts.loader';
import { PostsRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
    exports: [PostsService, PostsRepository],
    imports: [
        PrismaModule,
        forwardRef(() => RatingModule),
        forwardRef(() => UserModule),
        forwardRef(() => CommentsModule),
    ],
    providers: [PostsService, PostsResolver, PostsLoaders, PostsRepository],
})
export class PostsModule {}
