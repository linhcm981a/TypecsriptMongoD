import * as services from './services';

import Hapi from '@hapi/hapi';
import { Method, StatusCode } from '../enums/http';
import { loginValidator } from './validators';
import { ILoginRequest } from './interfaces';
import logger from '../logger';
import {
  loginResponse,
  invalidUsernameOrPasswordResponse
} from './__mocks__/data';

const login: Hapi.ServerRoute = {
  method: Method.POST,
  path: '/login',
  options: {
    auth: false,
    description: 'Login',
    tags: ['api', 'login'],
    validate: {
      payload: loginValidator
    },
    handler: async (
      hapiRequest: ILoginRequest,
      hapiResponse: Hapi.ResponseToolkit
    ) => {
      const {
        payload: { email, password },
        headers
      } = hapiRequest;
      logger.info(`Login Header request>>>`, headers);
      const { user, token } = await services.login(email, password);
      return hapiResponse
        .response({
          token,
          user
        })
        .code(StatusCode.OK);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          [StatusCode.OK]: {
            description: 'Login success',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  example: loginResponse
                }
              }
            }
          },
          [StatusCode.BAD_REQUEST]: {
            description: 'invalid email or password',
            schema: {
              properties: {
                data: {
                  type: 'object',
                  example: invalidUsernameOrPasswordResponse
                }
              }
            }
          }
        }
      }
    }
  }
};

const authHandlers: Hapi.ServerRoute[] = [login];

export default authHandlers;
