import * as HapiSwagger from 'hapi-swagger';
import * as Package from '../../package.json';
import * as config from '../config';

let basePath = config.get('SWAGGER_BASE_PATH');

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'MS Chat API Documentation',
    version: Package.version
  },
  grouping: 'tags',
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ jwt: [] }],
  pathReplacements: [
    {
      replaceIn: 'endpoints',
      pattern: /\//,
      replacement: basePath
    }
  ]
};

export default {
  plugin: HapiSwagger,
  options: swaggerOptions
};
