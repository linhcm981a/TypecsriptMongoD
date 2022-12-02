import logger from '../logger';
import Hapi from '@hapi/hapi';
import { AppError } from '../common/appError';
import { ERROR_CODE } from '../enums/error';

export interface IAuthDecoded {
  id: string;
  token: string;
}
export const getAuthorizerId = (hapiRequest: Hapi.Request) => {
  const decoded = hapiRequest.auth.artifacts.decoded as IAuthDecoded;
  if (decoded) {
    return decoded.id;
  }
  logger.error('Authorization missing userId: ', hapiRequest);
  throw new AppError(ERROR_CODE.UNAUTHORIZED);
};
