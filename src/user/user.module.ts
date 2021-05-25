import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule],
    providers: [UserResolver, UserService],
})
export class UserModule {}
