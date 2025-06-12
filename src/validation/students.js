import Joi from 'joi';
export const createStudentSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.number().min(8).max(15).required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateStudentSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().min(8).max(15).required(),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});