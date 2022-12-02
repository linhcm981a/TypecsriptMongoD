import Hapi from '@hapi/hapi';
import { Method, StatusCode } from '../enums/http';
import { ICreateChannelRequest, IGetListRequest } from './interfaces';
import {
  createTodoPayloadValidator,
  getListQueryValidator
} from './validators';
import * as services from './services';
import { baseTodoResponse, listTodoResponse } from './__mocks__/data';
import { mapCreateTodoResponse, mapListTodoResponse } from './presenter';

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

const todoHandlers: Hapi.ServerRoute[] = [createTodo, getListTodo];

export default todoHandlers;
