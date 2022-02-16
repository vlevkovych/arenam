import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { AppConfigModule } from './config/app/app-config.module';
import { PostsModule } from './posts/posts.module';
import { RatingModule } from './rating/rating.module';
import { UserModule } from './user/user.module';

import type { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
    imports: [
        AppConfigModule,
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql',
            formatError: (error: GraphQLError) => {
                const graphQLFormattedError: GraphQLFormattedError = {
                    message: error.message,
                };
                return graphQLFormattedError;
            },
        }),
        UserModule,
        AuthModule,
        PostsModule,
        CommentsModule,
        RatingModule,
    ],
})
export class AppModule {}
