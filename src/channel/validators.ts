import * as constants from '../constants';
import { SortFieldEnum, SortTypeEnum } from './enums';
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

export const getChannelListQueryValidator = {
  limit: Joi.number()
    .min(constants.GET_LIST_MIN_LIMIT)
    .max(constants.GET_LIST_MAX_LIMIT)
    .optional(),
  page: Joi.number()
    .min(constants.GET_LIST_MIN_PAGE)
    .optional(),
  sortField: Joi.string()
    .allow(null, '')
    .valid(Object.values(SortFieldEnum)),
  sortType: Joi.string()
    .allow(null, '')
    .valid(Object.values(SortTypeEnum))
};
