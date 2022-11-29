const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

export const loginValidator = Joi.object({
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});
