import Hapi from '@hapi/hapi';
import _ from 'lodash';

import { HttpResponse } from '../common/httpResponse';
import { AppError } from '../common/appError';
import * as config from '../config';

const documentPathRegex = /^\/documentation/;
const swaggerPathRegex = /^\/swagger/;
const hapiSwaggerPath = config.get('SWAGGER_BASE_PATH');
const { cors } = config.get('server');

const handleHapiResponse = (
  hapiRequest: Hapi.Request,
  hapiResponse: Hapi.ResponseToolkit
) => {
  // ignore document ui path
  if (documentPathRegex.test(hapiRequest.url.pathname)) {
    const hapiSwaggerContext = {
      context: {
        hapiSwagger: {
          jsonPath: `${hapiSwaggerPath}swagger.json`,
          swaggerUIPath: `${hapiSwaggerPath}swaggerui/`
        }
      }
    };

    _.merge(hapiResponse.request.response, { source: hapiSwaggerContext });
    return hapiResponse.continue;
  }

  if (swaggerPathRegex.test(hapiRequest.url.pathname)) {
    return hapiResponse.continue;
  }

  const httpResponse = new HttpResponse<any>();

  const responseData = hapiResponse.request.response;

  if (responseData instanceof Error) {
    // parse raw error not coming from server handler, ex: joi validation
    if (!responseData.isServer) {
      httpResponse.fail(
        {
          message: responseData.output.payload.message,
          code: responseData.output.payload.error
        },
        responseData.output.statusCode
      );
    }

    if (responseData instanceof AppError) {
      const errors = responseData.getErrors();
      httpResponse.fail(
        {
          message: errors.message,
          code: responseData.errorCode,
          details: errors.errors
        },
        errors.statusCode
      );
    } else {
      httpResponse.fail(
        {
          message: responseData.output.payload.message,
          code: responseData.output.payload.error
        },
        responseData.output.statusCode
      );
    }
  } else {
    httpResponse.success(responseData.source, responseData.statusCode);
  }

  let response = hapiResponse
    .response(httpResponse.getBody())
    .code(httpResponse.getStatusCode());

  Object.keys(cors).forEach((key: string) => {
    response.headers[key] = cors[key];
  });

  return response;
};

const responseWrapper: Hapi.Plugin<{}> = {
  name: 'responseWrapper',
  version: '1.0.0',
  register: (server: Hapi.Server) => {
    server.ext('onPreResponse', handleHapiResponse);
  },
  once: true
};

export default {
  plugin: responseWrapper
};
