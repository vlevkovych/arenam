import * as Joi from 'joi';
import { EnvironmentVariables } from './env.type';

export const validationSchema = Joi.object({
    [EnvironmentVariables.port]: Joi.number().default(3000),
    [EnvironmentVariables.host]: Joi.string().default('localhost'),
    [EnvironmentVariables.dbUsername]: Joi.string().required(),
    [EnvironmentVariables.dbPassword]: Joi.string().required(),
    [EnvironmentVariables.dbDatabaseName]: Joi.string().required(),
    [EnvironmentVariables.dbUrl]: Joi.string().required(),
    [EnvironmentVariables.jwtSecret]: Joi.string().required(),
});
