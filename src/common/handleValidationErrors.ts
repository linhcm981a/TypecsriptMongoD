import hapi from '@hapi/hapi';
import { ValidationError } from '@hapi/joi';
import { ERROR_CODE } from '../enums/error';
import { IErrorDetails } from '../interfaces/error';
import { AppError, ErrorList, JoiValidationErrors } from './appError';

interface JoiValidationErrors {
  [index: string]: ERROR_CODE;
}

const buildKey = (paths: (string | number)[]): string => {
  return paths.join('.');
};

const errorHandler: hapi.Lifecycle.Method = (
  _req: hapi.Request,
  res: hapi.ResponseToolkit,
  err?: Error
) => {
  if (!err) {
    return res.continue;
  }
  if ((err as ValidationError).isJoi) {
    const details = (err as ValidationError).details;
    const mappedDetails = details.reduce<IErrorDetails[]>(
      (acc, detail, index) => {
        if (
          index !== 0 &&
          buildKey(detail.path) === buildKey(details[index - 1].path)
        ) {
          return acc;
        }

        const constraint = detail.type.split('.').pop() || '';
        const errorCode =
          (JoiValidationErrors as JoiValidationErrors)[constraint] ||
          ERROR_CODE.INCORRECT_FIELD;
        const defaultError = ErrorList[errorCode];
        acc.push({
          message: defaultError.message,
          code: errorCode,
          key: buildKey(detail.path)
        });

        return acc;
      },
      []
    );
    throw new AppError(ERROR_CODE.INVALID_REQUEST, mappedDetails);
  }

  throw err;
};

export default errorHandler;
