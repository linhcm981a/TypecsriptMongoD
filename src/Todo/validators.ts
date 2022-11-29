const Joi = require('joi');

export const createTodoPayloadValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, '')
});
