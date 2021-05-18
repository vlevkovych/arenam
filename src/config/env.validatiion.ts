import * as Joi from 'joi';

export const validationSchema = Joi.object({
    APP_HOST: Joi.string().default(3000),
    APP_PORT: Joi.number().default('localhost'),
});
