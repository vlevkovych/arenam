import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
    exports: [PostsService],
    imports: [PrismaModule, forwardRef(() => UserModule)],
    providers: [PostsService, PostsResolver],
})
export class PostsModule {}
