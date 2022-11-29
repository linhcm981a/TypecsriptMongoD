import { connect, connection } from 'mongoose';
import * as config from '../config';
import logger from '../logger';

export const connectMongo = () =>
  new Promise<void>((resolve, reject) => {
    const dbName = config.get('MONGO_DB_NAME');
    const dbUri = config.get('MONGO_URI');
    connection.once('open', () => resolve());
    connection.on('error', (err: any) => {
      logger.error('error while connecting to mongodb', err);
      reject(err);
    });

    connect(dbUri, {
      dbName
    });
  });
