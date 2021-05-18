import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { validate } from './env.validatiion';

@Module({
    exports: [AppConfigService],
    imports: [
        ConfigModule.forRoot({
            validate,
        }),
    ],
    providers: [AppConfigService],
})
export class AppConfigModule {}
