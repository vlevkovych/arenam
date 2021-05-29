import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app/app-config.module';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        AppConfigModule,
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        UserModule,
        AuthModule,
        PostsModule,
    ],
})
export class AppModule {}
