import Hapi from '@hapi/hapi';
import { Method, StatusCode } from '../enums/http';
import { ICreateChannelRequest } from './interfaces';
import { createTodoPayloadValidator } from './validators';
import * as services from './services';
import { baseTodoResponse } from './__mocks__/data';
import { mapCreateTodoResponse } from './presenter';

const createTodo: Hapi.ServerRoute = {
  method: Method.POST,
  path: '/todo',
  options: {
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

const todoHandlers: Hapi.ServerRoute[] = [createTodo];

export default todoHandlers;
