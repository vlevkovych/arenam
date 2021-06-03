import { Module } from '@nestjs/common';

import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
    providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
