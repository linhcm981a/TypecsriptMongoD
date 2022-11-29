import Hapi from '@hapi/hapi';

export interface ICreateChannelRequest extends Hapi.Request {
  payload: ICreateTodoPayload;
}

export interface ICreateTodoPayload {
  name: string;
  description?: string;
  createdBy: string;
  updatedBy: string;
}

export interface ITodo {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  updatedBy: string;
  createdAt?: string;
  updatedAt?: string;
}
