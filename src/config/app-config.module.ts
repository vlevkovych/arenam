import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { validationSchema } from './env.validatiion';

@Module({
    exports: [AppConfigService],
    imports: [
        ConfigModule.forRoot({
            validationSchema,
        }),
    ],
    providers: [AppConfigService],
})
export class AppConfigModule {}
