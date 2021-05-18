import * as Joi from 'joi';
import { EnvironmentVariables } from './env.type';

export const validationSchema = Joi.object({
    [EnvironmentVariables.port]: Joi.number().default(3000),
    [EnvironmentVariables.host]: Joi.string().default('localhost'),
});
