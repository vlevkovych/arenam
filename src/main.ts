import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import type { AppConfigService } from './config/app-config.service';

const bootstrap: () => Promise<void> = async () => {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    const appConfigService: AppConfigService = app.get('AppConfigService');
    await app.listen(
        appConfigService.get('APP_PORT'),
        appConfigService.get('APP_HOST'),
    );
};

bootstrap().catch((error: Readonly<Error>) => {
    Logger.error(error.message, error.stack, 'MainFunction');
});
