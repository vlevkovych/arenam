import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import * as Joi from 'joi';

@Module({
    exports: [AppConfigService],
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                APP_HOST: Joi.string().default('localhost'),
                APP_PORT: Joi.number().default(3000),
            }),
        }),
    ],
    providers: [AppConfigService],
})
export class AppConfigModule {}
