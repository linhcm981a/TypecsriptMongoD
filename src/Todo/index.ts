import Hapi from '@hapi/hapi';
import { Method, StatusCode } from '../enums/http';
import {
  ICreateChannelRequest,
  IGetListRequest,
  IGetTodoDetailRequest
} from './interfaces';
import {
  createTodoPayloadValidator,
  getListQueryValidator,
  todoIdParamValidator
} from './validators';
import * as services from './services';
import {
  baseTodoResponse,
  listTodoResponse,
  baseTodoResponseAdmin
} from './__mocks__/data';
import {
  mapCreateTodoResponse,
  mapListTodoResponse,
  mapGetTodoDetailResponse
} from './presenter';
import logger from '../logger';

const createTodo: Hapi.ServerRoute = {
  method: Method.POST,
  path: '/todo',
  options: {
    auth: 'jwt',
    description: 'Create todo',
    tags: ['api', 'todo'],
    validate: {
      payload: createTodoPayloadValidator
    },
    handler: async (
      hapiRequest: ICreateChannelRequest,
      hapiResponse: Hapi.ResponseToolkit
    ) => {
      const todo = await services.createTodo(hapiRequest.payload);
      return hapiResponse
        .response(mapCreateTodoResponse(todo))
        .code(StatusCode.OK);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          [StatusCode.OK]: {
            description: 'Create todo successfully',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  example: baseTodoResponse
                }
              }
            }
          }
        }
      }
    }
  }
};

const getListTodo: Hapi.ServerRoute = {
  method: Method.GET,
  path: '/todo',
  options: {
    auth: 'jwt',
    description: 'Get list todo',
    tags: ['api', 'todo'],
    validate: {
      query: getListQueryValidator
    },
    handler: async (
      hapiRequest: IGetListRequest,
      hapiResponse: Hapi.ResponseToolkit
    ) => {
      const { query } = hapiRequest;
      const rows = await services.getListTodoByParameter({
        ...query
      });
      return hapiResponse
        .response(mapListTodoResponse(rows))
        .code(StatusCode.OK);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          [StatusCode.OK]: {
            description: 'Get List todo successfully',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  example: listTodoResponse
                }
              }
            }
          }
        }
      }
    }
  }
};

const getTodoDetail: Hapi.ServerRoute = {
  method: Method.GET,
  path: '/todo/{todoId}',
  options: {
    auth: 'jwt',
    description: 'Get Todo Detail',
    tags: ['api', 'todo'],
    validate: {
      params: todoIdParamValidator
    },
    handler: async (
      hapiRequest: IGetTodoDetailRequest,
      hapiResponse: Hapi.ResponseToolkit
    ) => {
      const {
        params: { todoId }
      } = hapiRequest;
      const todo = await services.getTodoDetailById(todoId);
      if (!todo) {
        logger.error('Todo with todoId ' + todoId + ' not found');
        return hapiResponse.response(undefined).code(StatusCode.NOT_FOUND);
      }
      return hapiResponse
        .response(mapGetTodoDetailResponse(todo))
        .code(StatusCode.OK);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          [StatusCode.OK]: {
            description: 'Get Todo Detail successfully',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  example: baseTodoResponseAdmin
                }
              }
            }
          },
          [StatusCode.NOT_FOUND]: {
            description: 'Todo with ID not found'
          }
        }
      }
    }
  }
};

const todoHandlers: Hapi.ServerRoute[] = [
  createTodo,
  getListTodo,
  getTodoDetail
];

export default todoHandlers;
