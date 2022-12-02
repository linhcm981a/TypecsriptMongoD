import { IPaginationParams } from '../common/interfaces';
import logger from '../logger';
import { SortFieldEnum } from '../common/enums';
import {
  GET_LIST_DEFAULT_LIMIT,
  GET_LIST_DEFAULT_PAGE,
  GET_LIST_DEFAULT_SORT_TYPE
} from '../constants';
import { IPagination } from '../common/interfaces';

export const getPaginationParams = (parameter: any): IPaginationParams => {
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

export const createPaginationParams = (query: any): IPaginationParams => {
  const paginationParams = getPaginationParams({
    limit: Number(query.limit) || 10,
    page: Number(query.page) || 1,
    sortType: Number(query.sortType) || -1,
    sortField:
      query.sortField || query.customSortField || SortFieldEnum.CREATED_AT
  });
  logger.info('paginationParams: ', paginationParams);
  return paginationParams;
};

export const createPagination = (
  totalItems: number,
  paginationParams: IPaginationParams
): IPagination => {
  const pagination: IPagination = {
    totalItems: Number(totalItems),
    page: paginationParams.page,
    totalPages: Math.ceil(Number(totalItems) / paginationParams.limit),
    limit: paginationParams.limit
  };
  logger.info('pagination: ', pagination);
  return pagination;
};
