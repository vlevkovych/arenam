import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import type { EnvType } from './env.type';

class EnvironmentVariables implements EnvType {
    @IsNumber()
    public APP_PORT!: number;

    @IsString()
    public APP_HOST!: string;
}

export const validate = (
    config: Record<string, unknown>,
): EnvironmentVariables => {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
