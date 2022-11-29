const Joi = require('joi');

export const registerValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});
