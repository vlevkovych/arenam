import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../config/prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';
import { RatingModule } from '../rating/rating.module';
import { UserModule } from '../user/user.module';

import CommentsLoader from './comments.loader';
import { CommentsRepository } from './comments.repository';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
    exports: [CommentsService, CommentsRepository],
    imports: [
        PrismaModule,
        forwardRef(() => UserModule),
        forwardRef(() => RatingModule),
        forwardRef(() => PostsModule),
    ],
    providers: [
        CommentsService,
        CommentsResolver,
        CommentsLoader,
        CommentsRepository,
    ],
})
export class CommentsModule {}
