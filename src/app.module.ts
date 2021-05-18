import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';

@Module({
    imports: [AppConfigModule],
})
export class AppModule {}
