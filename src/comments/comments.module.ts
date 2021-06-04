import { Module, forwardRef } from '@nestjs/common';

import { PrismaModule } from '../config/prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';
import { RatingModule } from '../rating/rating.module';
import { UserModule } from '../user/user.module';

import CommentsLoader from './comments.loader';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
    exports: [CommentsService],
    imports: [
        PrismaModule,
        UserModule,
        RatingModule,
        forwardRef(() => PostsModule),
    ],
    providers: [CommentsService, CommentsResolver, CommentsLoader],
})
export class CommentsModule {}
