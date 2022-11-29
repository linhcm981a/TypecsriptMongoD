import { IPagination, IPaginationParams } from '../interfaces/common';
import logger from '../logger';
import {
  IChannel,
  IGetChannelParameter,
  IGetChannelsQueryParams,
  IGetChannelListResponse
} from './interfaces';
import { getPaginationParams } from '../utils';
import * as repo from './repo';

export const getChannelsByParameter = async (
  parameter: IGetChannelParameter
): Promise<IGetChannelListResponse> => {
  logger.info('Get customer profiles with query', parameter);

  const paginationParams: IPaginationParams = getPaginationParams({
    limit: Number(parameter.limit) || 10,
    offset: 2,
    page: 1,
    sortType: 1,
    sortField: ''
  });

  const queryParams: IGetChannelsQueryParams = {};

  const [items, totalItems]: (IChannel[] | number)[] = await Promise.all([
    repo.getChannelsByParameter(queryParams, paginationParams),
    repo.countByParameter(queryParams)
  ]);
  logger.info('Search result:', items);
  const pagination: IPagination = {
    totalItems: Number(totalItems),
    page: paginationParams.page,
    totalPages: Math.ceil(Number(totalItems) / paginationParams.limit),
    limit: paginationParams.limit
  };

  const result: IGetChannelListResponse = {
    items: items as IChannel[],
    pagination
  };
  return result;
};
