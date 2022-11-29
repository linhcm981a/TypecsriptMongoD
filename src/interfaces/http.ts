import { Method } from '../enums/http';
import { IError } from './error';

export interface IHttpResponseBody<DataType, ErrorType> {
  data?: DataType;
  error?: IError<ErrorType>;
}

export interface ICallbackParams {
  url: string;
  method: Method;
  data: any;
}

export interface IRequestParams {
  url: string;
  method: Method;
  headers?: any;
  data: any;
}
