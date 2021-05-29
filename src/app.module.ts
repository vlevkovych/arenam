import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppConfigModule } from './config/app/app-config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

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
