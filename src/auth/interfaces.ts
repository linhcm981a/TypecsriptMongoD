import Hapi from '@hapi/hapi';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginRequest extends Hapi.Request {
  payload: ILoginPayload;
}
