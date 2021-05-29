import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EnvironmentVariables } from '../config/app/env.type';
import { PrismaModule } from '../config/prisma/prisma.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: EnvironmentVariables.jwtSecret,
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}
