import { Module } from '@nestjs/common';

import { PrismaModule } from '../config/prisma/prisma.module';

import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
    exports: [CommentsService],
    imports: [PrismaModule],
    providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
