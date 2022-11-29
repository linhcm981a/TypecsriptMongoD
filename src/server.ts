import Hapi from '@hapi/hapi';
import errorHandler from './common/handleValidationErrors';
import plugins from './plugins';
import { routes } from './routes';
import { get } from './config';
import logger from './logger';
import { connectMongo } from './common/mongoDb';

const { port, host } = get('server');

const createServer = async () => {
  const server = new Hapi.Server({
    port,
    host,
    routes: {
      cors: true,
      validate: {
        options: {
          abortEarly: false
        },
        failAction: errorHandler
      }
    }
  });

  // Register plugins
  await server.register(plugins);

  // Register routes
  server.route(routes);

  return server;
};

export const init = async () => {
  await connectMongo();
  const server = await createServer();
  await server
    .initialize()
    .then(() =>
      logger.info(`server started at ${server.info.host}:${server.info.port}`)
    );
  return server;
};

export const start = async (module: NodeModule) => {
  if (!module.parent) {
    logger.info('Start server');
    try {
      const server = await init();
      await server.start();
    } catch (err) {
      logger.error('Server cannot start', err);
      logger.on('finish', function() {
        process.exit(1);
      });
    }
  }
};

start(module);
