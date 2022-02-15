import * as Joi from 'joi';

export const signupInputValidationSchema = Joi.object({
    emailAddress: Joi.string().min(2).email().required().messages({
        'string.email': 'Invalid Email',
        'string.min': 'Email length must be at least 2 characters long',
        'string.required': "Field 'email' is required",
    }),
    name: Joi.string().min(2).required().messages({
        'string.min': 'Name length must be at least 2 characters long',
        'string.required': "Field 'name' is required",
    }),
    password: Joi.string().min(5).required().messages({
        'string.min': 'Password length must be at least 5 characters long',
        'string.required': "Field 'password' is required",
    }),
});
