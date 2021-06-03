import { Module } from '@nestjs/common';

import { PrismaModule } from '../config/prisma/prisma.module';
import { UserModule } from '../user/user.module';

import CommentsLoader from './comments.loader';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
    exports: [CommentsService],
    imports: [PrismaModule, UserModule],
    providers: [CommentsService, CommentsResolver, CommentsLoader],
})
export class CommentsModule {}
