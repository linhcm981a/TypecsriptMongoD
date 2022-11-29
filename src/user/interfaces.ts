import Hapi from '@hapi/hapi';

export interface IRegisterRequest extends Hapi.Request {
  payload: IRegisterPayload;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserToBeCreated {
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IAuthUser extends IUser {
  password?: string;
  salt?: string;
}
