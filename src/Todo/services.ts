import {
  ICreateTodoPayload,
  IGetListQueryParams,
  IGetListTodoResponse
} from './interfaces';
import logger from '../logger';
import { ITodo } from './interfaces';
import * as repo from './repo';
import { IPaginationParams } from '../common/interfaces';
import { createPaginationParams, createPagination } from '../utils/pagination';

export const createTodo = async (
  payload: ICreateTodoPayload
): Promise<ITodo> => {
  logger.info('Create todo payload:', payload);

  return await repo.createTodo(payload);
};

export const getListTodoByParameter = async (
  query: IGetListQueryParams
): Promise<IGetListTodoResponse> => {
  logger.info('Get list todo by with query', query);

  const paginationParams: IPaginationParams = createPaginationParams({
    ...query,
    customSortField: query.sortField || 'name'
  });

  let queryParams: any = {};
  if (query.keyword) {
    queryParams = {
      $or: [
        { email: { $regex: query.keyword, $options: 'i' } },
        { name: { $regex: query.keyword, $options: 'i' } }
      ]
    };
  }

  logger.info('Will search with query:', queryParams);
  logger.info('paginationParams: ', paginationParams);

  const [items, totalItems]: (ITodo[] | number)[] = await Promise.all([
    repo.getTodoByParameter(queryParams, paginationParams),
    repo.countByParameter(queryParams)
  ]);
  logger.info('Search result:', items);

  const result: IGetListTodoResponse = {
    items: items as ITodo[],
    pagination: createPagination(Number(totalItems), paginationParams)
  };

  return result;
};

export const getTodoDetailById = async (id: string): Promise<ITodo | null> => {
  logger.info('Get Todo By Id ', id);

  return repo.getTodoDetailById(id);
};
