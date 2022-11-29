import Hapi from '@hapi/hapi';
import { createNamespace } from 'cls-hooked';
import { Tracing, HTTP_HEADERS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const session = createNamespace(Tracing.TRACER_SESSION);

const handleHapiRequest = async (
  hapiRequest: Hapi.Request,
  hapiResponse: Hapi.ResponseToolkit
) => {
  const transactionId = hapiRequest.headers[Tracing.TRANSACTION_ID] || uuidv4();
  const authToken = hapiRequest.headers[HTTP_HEADERS.AUTH];
  session.bindEmitter(hapiRequest.raw.req);
  session.bindEmitter(hapiRequest.raw.res);

  const clsCtx = session.createContext();
  session.enter(clsCtx);
  // @ts-ignore better approach?
  hapiRequest.app[Tracing.TRACER_SESSION] = {
    context: clsCtx
  };
  session.set(Tracing.TRANSACTION_ID, transactionId);
  session.set(HTTP_HEADERS.AUTH, authToken);
  return hapiResponse.continue;
};

const requestWrapper: Hapi.Plugin<{}> = {
  name: 'requestWrapper',
  version: '1.0.0',
  register: (server: Hapi.Server) => {
    server.ext('onRequest', handleHapiRequest);
  },
  once: true
};

export default {
  plugin: requestWrapper
};
