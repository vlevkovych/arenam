import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/app-config.module';
import { GraphqlConfigModule } from './config/graphql/graphql-config.module';

@Module({
    imports: [AppConfigModule, GraphqlConfigModule],
})
export class AppModule {}
