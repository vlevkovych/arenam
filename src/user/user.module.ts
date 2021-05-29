import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../config/prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    exports: [UserService],
    imports: [PrismaModule, AuthModule, forwardRef(() => PostsModule)],
    providers: [UserResolver, UserService],
})
export class UserModule {}
