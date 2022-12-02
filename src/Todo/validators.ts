const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
import * as constants from '../constants';
import { SortFieldEnum, SortTypeEnum } from '../common/enums';

export const createTodoPayloadValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, '')
});

export const getListQueryValidator = Joi.object({
  keyword: Joi.string().allow(null, ''),
  limit: Joi.number()
    .min(constants.GET_LIST_MIN_LIMIT)
    .max(constants.GET_LIST_MAX_LIMIT)
    .optional(),
  page: Joi.number()
    .min(constants.GET_LIST_MIN_PAGE)
    .optional(),
  sortField: Joi.string()
    .allow(null, '')
    .valid(...Object.values(SortFieldEnum)),
  sortType: Joi.string()
    .allow(null, '')
    .valid(...Object.values(SortTypeEnum))
});

export const todoIdParamValidator = Joi.object({
  todoId: Joi.objectId().required()
});

export const updateTodoPayloadValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, '')
});
