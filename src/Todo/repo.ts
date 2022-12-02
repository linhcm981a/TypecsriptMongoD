import { TodoDocument } from './model';
import {
  ICreateTodoPayload,
  ITodo,
  IGetListQueryParams,
  IUpdateTodoPayload
} from './interfaces';
import logger from '../logger';
import { TodoModel } from './model';
import { IPaginationParams } from '../common/interfaces';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const documentToObject = (document: TodoDocument) =>
  document.toObject({ getters: true }) as ITodo;

export const documentToArray = (documents: TodoDocument[]) =>
  documents.map(document => documentToObject(document));

export const createTodo = async (
  payload: ICreateTodoPayload,
  authorizerId: string
): Promise<ITodo> => {
  try {
    logger.info('todo to be created', payload);
    const todoToBeCreated = {
      ...payload,
      createdBy: authorizerId,
      updatedBy: authorizerId
    };

    const todo = await TodoModel.create(todoToBeCreated);
    logger.info('Todo created successfully!: ', todo);

    return todo;
  } catch (error) {
    logger.error('Create todo DB Error>>>', error);
    throw error;
  }
};

export const getTodoByParameter = async (
  queryParams: IGetListQueryParams,
  paginationParams: IPaginationParams
): Promise<ITodo[]> => {
  const { limit, offset, sortField, sortType } = paginationParams;
  const query = pickBy(queryParams, identity);

  logger.info(
    `Search limit: ${limit} offset: ${offset} sortField: ${sortField} sortType: ${sortType} query:`,
    query
  );

  const rows = await TodoModel.find(query)
    .sort({ [sortField]: sortType })
    .limit(limit)
    .skip(offset)
    .exec();

  return rows && documentToArray(rows);
};

export const countByParameter = async (
  queryParams: IGetListQueryParams
): Promise<number> => {
  const query = pickBy(queryParams, identity);
  const countTotal = await TodoModel.count(query).exec();

  return countTotal;
};

export const getTodoDetailById = async (id: string): Promise<ITodo | null> => {
  try {
    const todo = await TodoModel.findById(id);
    return todo && documentToObject(todo);
  } catch (e) {
    logger.error('get todo By Id Error>>>', e);
    throw e;
  }
};

export const updateTodoById = async (
  todoId: string,
  payload: IUpdateTodoPayload
): Promise<ITodo | null> => {
  try {
    const todoToBeUpdated = await TodoModel.findOneAndUpdate(
      {
        _id: todoId
      },
      {
        $set: payload
      },
      { new: true }
    );
    return todoToBeUpdated && documentToObject(todoToBeUpdated);
  } catch (error) {
    logger.error('update todo DB Error>>>', error);
    throw error;
  }
};
