import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    public constructor(private configService: ConfigService) {}

    public get port(): number {
        return this.configService.get<number>('APP_PORT') ?? 3000;
    }

    public get host(): string {
        return this.configService.get<string>('APP_HOST') ?? 'localhost';
    }
}
