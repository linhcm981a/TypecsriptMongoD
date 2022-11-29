import { SortFieldEnum } from '../channel/enums';
import { IPaginationParams } from '../interfaces/common';
import {
  GET_LIST_DEFAULT_LIMIT,
  GET_LIST_DEFAULT_PAGE,
  GET_LIST_DEFAULT_SORT_TYPE
} from '../constants';

export const getPaginationParams = (
  parameter: IPaginationParams
): IPaginationParams => {
  const limit = parameter.limit || GET_LIST_DEFAULT_LIMIT;

  const page = parameter.page || GET_LIST_DEFAULT_PAGE;

  const offset = limit * (page - 1);

  const sortType = parameter.sortType || GET_LIST_DEFAULT_SORT_TYPE;

  const sortField = parameter.sortField || SortFieldEnum.UPDATED_AT;

  const paginationParams: IPaginationParams = {
    limit,
    offset,
    page,
    sortField,
    sortType
  };

  return paginationParams;
};
