import * as Joi from 'joi';

export const signupInputValidationSchema = Joi.object({
    emailAddress: Joi.string().email().required(),
    name: Joi.string().min(2).required(),
    password: Joi.string().min(5).required(),

});
