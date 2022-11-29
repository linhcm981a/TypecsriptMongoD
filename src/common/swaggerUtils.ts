import { StatusCode } from '../enums/http';

export const genSwaggerPlugins = (
  desHappyCase: string,
  schemaResponse?: any
) => {
  let options = {};
  if (schemaResponse) {
    options = {
      schema: {
        properties: {
          data: {
            type: 'object',
            example: schemaResponse
          }
        }
      }
    };
  }
  return {
    'hapi-swagger': {
      responses: {
        [StatusCode.OK]: {
          description: desHappyCase,
          ...options
        },
        [StatusCode.BAD_REQUEST]: {
          description: 'Invalid request'
        },
        [StatusCode.NOT_FOUND]: {
          description: 'Not found'
        },
        [StatusCode.INTERNAL_SERVER_ERROR]: {
          description: 'Internal server error'
        }
      }
    }
  };
};
