import axios from 'axios';
import { ICallbackParams, IRequestParams } from '../interfaces/http';
import * as config from '../config';
import logger from '../logger';

export const setupCallback = (params: ICallbackParams) => {
  const timeout = 1000;
  setTimeout(async () => {
    const hostName = config.get('hostName');
    try {
      await axios({
        method: params.method,
        url: `${hostName}/${params.url}`,
        data: params.data
      });
      logger.info('callback to service to update data', params);
    } catch (error) {
      logger.error(error);
    }
  }, timeout);
};

export const makeRequest = async (params: IRequestParams): Promise<any> => {
  const hostName = config.get('hostName');
  try {
    logger.info(
      `[Gateway][MakeRequest] ${params.method} ${hostName}/${params.url} payload: `,
      params.data
    );
    const response = await axios({
      method: params.method,
      url: `${hostName}/${params.url}`,
      data: params.data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    logger.info(
      '[Gateway][Response] Successfully! response.data:',
      response.data
    );
    logger.info('[Gateway][Response] response.headers ', response.headers);
    return response.data;
  } catch (error) {
    if (error.response) {
      logger.error('[Gateway][Response] Failure ', error.response);
    }

    throw error.response;
  }
};
