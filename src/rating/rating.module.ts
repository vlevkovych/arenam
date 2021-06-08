import { Module, forwardRef } from '@nestjs/common';

import { CommentsModule } from '../comments/comments.module';
import { PrismaModule } from '../config/prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';

import { RatingRepository } from './rating.repository';
import { RatingService } from './rating.service';

@Module({
    exports: [RatingService, RatingRepository],
    imports: [
        PrismaModule,
        forwardRef(() => PostsModule),
        forwardRef(() => CommentsModule),
    ],
    providers: [RatingService, RatingRepository],
})
export class RatingModule {}
