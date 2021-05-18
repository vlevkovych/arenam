import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import * as Joi from 'joi';

@Module({
    exports: [AppConfigService],
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                APP_HOST: Joi.string(),
                APP_PORT: Joi.number(),
            }),
        }),
    ],
    providers: [AppConfigService],
})
export class AppConfigModule {}
