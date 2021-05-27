import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [PrismaModule],
    providers: [AuthService, AuthResolver],
})
export class AuthModule {}
