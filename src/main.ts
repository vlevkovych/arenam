import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvironmentVariables } from './config/app/env.type';

import type { AppConfigService } from './config/app/app-config.service';
import type { NestExpressApplication } from '@nestjs/platform-express';

const bootstrap: () => Promise<void> = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const appConfigService: AppConfigService = app.get('AppConfigService');
    const PORT = appConfigService.get(EnvironmentVariables.port);
    const HOST = appConfigService.get(EnvironmentVariables.host);

    await app.listen(PORT, HOST);
};

bootstrap().catch((error: Readonly<Error>) => {
    Logger.error(error.message, error.stack, 'MainFunction');
});
