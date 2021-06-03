import * as Joi from 'joi';

import { ValidationError } from '../../common/errors/validation.error';

export const signupInputValidationSchema = Joi.object({
    emailAddress: Joi.string()
        .email()
        .required()
        .error(() => new ValidationError('Invalid Email', 'emailAddress')),
    name: Joi.string()
        .min(2)
        .required()
        .error(
            () =>
                new ValidationError(
                    'Name length must be at least 2 characters long',
                    'name',
                ),
        ),
    password: Joi.string()
        .min(5)
        .required()
        .error(
            () =>
                new ValidationError(
                    'Password length must be at least 5 characters long',
                    'password',
                ),
        ),
});
