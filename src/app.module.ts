import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/app-config.module';

@Module({
    imports: [AppConfigModule],
})
export class AppModule {}
