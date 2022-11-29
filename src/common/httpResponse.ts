import { StatusCode } from '../enums/http';
import { ERROR_CODE } from '../enums/error';
import { IHttpResponseBody } from '../interfaces/http';
import { IError } from '../interfaces/error';

export class HttpResponse<DataType> {
  private body: IHttpResponseBody<DataType, ERROR_CODE> = {};
  private statusCode: StatusCode;

  constructor() {
    this.body.data = undefined;
    this.body.error = undefined;
    this.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
  }
  success(data: DataType, statusCode: StatusCode = StatusCode.OK) {
    this.body.data = data;
    this.statusCode = statusCode;
  }
  fail(
    error: IError<ERROR_CODE>,
    statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR
  ) {
    this.body.error = error;
    this.statusCode = statusCode;
  }
  getData() {
    return this.body.data;
  }
  getBody() {
    return this.body;
  }
  getError() {
    return this.body.error;
  }
  getStatusCode() {
    return this.statusCode;
  }
}
