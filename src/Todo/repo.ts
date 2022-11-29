import { ICreateTodoPayload, ITodo } from './interfaces';
import logger from '../logger';
import { TodoModel } from './model';

export const createTodo = async (
  payload: ICreateTodoPayload
): Promise<ITodo> => {
  try {
    logger.info('todo to be created', payload);
    const todoToBeCreated = {
      ...payload
    };

    const todo = await TodoModel.create(todoToBeCreated);
    logger.info('Todo created successfully!: ', todo);

    return todo;
  } catch (error) {
    logger.error('Create todo DB Error>>>', error);
    throw error;
  }
};
