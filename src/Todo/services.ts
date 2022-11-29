import { ICreateTodoPayload } from './interfaces';
import logger from '../logger';
import { ITodo } from './interfaces';
import * as repo from './repo';

export const createTodo = async (
  payload: ICreateTodoPayload
): Promise<ITodo> => {
  logger.info('Create todo payload:', payload);

  return await repo.createTodo(payload);
};
