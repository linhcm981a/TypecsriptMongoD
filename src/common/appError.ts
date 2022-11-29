import { ERROR_CODE, StatusCode } from '../enums/error';
import { IErrorDetails, IErrorList } from '../interfaces/error';

export const JoiValidationErrors = {
  required: ERROR_CODE.INVALID_MANDATORY_FIELDS
};

export const ErrorList: IErrorList = {
  [ERROR_CODE.NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: 'Not found'
  },
  [ERROR_CODE.EMAIL_EXISTS]: {
    statusCode: StatusCode.BAD_REQUEST,
    message: 'Email was existed'
  }
};

export class AppError extends Error {
  public errorCode: ERROR_CODE;
  errors?: IErrorDetails[];
  constructor(errorCode: ERROR_CODE, errors?: IErrorDetails[]) {
    super(errorCode);
    this.errorCode = errorCode;
    this.name = AppError.name;
    this.errors = errors;
  }

  getErrors() {
    const error = ErrorList[this.errorCode];
    return {
      errors: this.errors,
      statusCode: error.statusCode,
      message: error.message
    };
  }
}
