import * as services from './services';

import Hapi from '@hapi/hapi';

import { Method, StatusCode } from '../enums/http';
import { registerValidator } from './validators';
import { IRegisterRequest } from './interfaces';
import { registerResponse } from './__mocks__/data';

const register: Hapi.ServerRoute = {
  method: Method.POST,
  path: '/register',
  options: {
    auth: false,
    description: 'Register',
    tags: ['api', 'user'],
    validate: {
      payload: registerValidator
    },
    handler: async (
      hapiRequest: IRegisterRequest,
      hapiResponse: Hapi.ResponseToolkit
    ) => {
      const result = await services.register(hapiRequest.payload);
      return hapiResponse.response(result).code(StatusCode.OK);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          [StatusCode.OK]: {
            description: 'Register success',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  example: registerResponse
                }
              }
            }
          },
          [StatusCode.BAD_REQUEST]: {
            description: ''
          }
        }
      }
    }
  }
};

const userHandlers: Hapi.ServerRoute[] = [register];

export default userHandlers;
