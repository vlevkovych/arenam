import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppConfigModule } from './config/app/app-config.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        AppConfigModule,
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        UserModule,
    ],
})
export class AppModule {}
