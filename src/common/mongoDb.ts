import { connect, connection } from 'mongoose';
import logger from '../logger';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongo = () =>
  new Promise<void>((resolve, reject) => {
    const dbUri = process.env.MONGO_URI || '';
    connection.once('open', () => resolve());
    connection.on('error', (err: any) => {
      logger.error('error while connecting to mongodb', err);
      reject(err);
    });

    connect(dbUri);
  });
