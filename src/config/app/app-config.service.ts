import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { EnvType } from './env.type';

@Injectable()
export class AppConfigService {
    public constructor(private readonly configService: ConfigService) {}

    public get<T extends keyof EnvType>(envVariable: T): T {
        const value = this.configService.get<T>(envVariable);
        if (!value) {
            throw new Error(`Environment variable "${envVariable}" is empty`);
        }
        return value;
    }
}
