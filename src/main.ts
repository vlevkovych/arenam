import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import type { AppConfigService } from './config/app/app-config.service';
import { EnvironmentVariables } from './config/app/env.type';

const bootstrap: () => Promise<void> = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const appConfigService: AppConfigService = app.get('AppConfigService');
    await app.listen(
        appConfigService.get(EnvironmentVariables.port),
        appConfigService.get(EnvironmentVariables.host),
    );
};

bootstrap().catch((error: Readonly<Error>) => {
    Logger.error(error.message, error.stack, 'MainFunction');
});
