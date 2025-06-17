import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': "Contact's name should be a string",
        'string.min': "Contact's name should have at least {#limit} characters",
        'string.max': "Contact's name should have at most {#limit} characters",
        'any.required': "Contact's name is required",
    }),
    phoneNumber: Joi.string().min(8).max(15).required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
    userId: Joi.string().custom((value, helper) => {
            if (value && !isValidObjectId(value)) {
                return helper.message('User id should be a valid mongo id');
            }
            return true;
        }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.string().min(8).max(15).required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});