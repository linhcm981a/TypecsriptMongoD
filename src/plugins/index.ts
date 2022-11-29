import Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import swagger from './swagger';
import good from './good';
import responseWrapper from './responseWrapper';
import requestWrapper from './requestWrapper';
import jwt from 'hapi-auth-jwt2';

const plugins: Hapi.ServerRegisterPluginObject<any>[] = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: jwt
  },
  good,
  swagger,
  responseWrapper,
  requestWrapper
];

export default plugins;
