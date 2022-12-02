import {
  ICreateTodoPayload,
  IGetListQueryParams,
  IGetListTodoResponse,
  IUpdateTodoPayload
} from './interfaces';
import logger from '../logger';
import { ITodo } from './interfaces';
import * as repo from './repo';
import * as todoServices from './services';
import { IPaginationParams } from '../common/interfaces';
import { createPaginationParams, createPagination } from '../utils/pagination';
import { AppError } from '../common/appError';
import { ERROR_CODE } from '../enums/error';

export const createTodo = async (
  payload: ICreateTodoPayload,
  authorizerId: string
): Promise<ITodo> => {
  logger.info('Create todo payload:', payload);

  return await repo.createTodo(payload, authorizerId);
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

export const updateTodoById = async (
  todoId: string,
  payload: IUpdateTodoPayload,
  authorizerId: string
): Promise<ITodo | null> => {
  const todo = await todoServices.getTodoDetailById(todoId);
  if (!todo) {
    logger.error(`Todo with todoId ${todoId} does not exist`);
    throw new AppError(ERROR_CODE.NOT_FOUND);
  }
  if (todo.createdBy != authorizerId) {
    logger.error(`todo with todoId ${todoId} does not belong to user`);
    throw new AppError(ERROR_CODE.PERMISSION_DENIED);
  }
  const updateTodo = await repo.updateTodoById(todoId, payload);
  logger.debug('Todo updated: ', updateTodo);
  return updateTodo;
};

export const deleteTodoById = async (todoId: string): Promise<ITodo | null> => {
  const getTodoById = await todoServices.getTodoDetailById(todoId);
  logger.info('getTodoById: ', getTodoById);
  const deleteTodoById = await repo.deleteTodoById(todoId);
  logger.info('todoDeleted: ', deleteTodoById);

  return deleteTodoById;
};
