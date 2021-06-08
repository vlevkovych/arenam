import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../config/prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';

import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    exports: [UserService, UserRepository],
    imports: [
        PrismaModule,
        forwardRef(() => AuthModule),
        forwardRef(() => PostsModule),
    ],
    providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}
