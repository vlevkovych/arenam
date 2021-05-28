import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../config/prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [UserResolver, UserService],
})
export class UserModule {}
