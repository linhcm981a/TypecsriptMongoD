import Hapi from '@hapi/hapi';
import { SortFieldEnum, SortTypeEnum } from '../common/enums';

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

export interface IGetListRequest extends Hapi.Request {
  query: IGetListQueryParams;
}
export interface IGetListQueryParams {
  keyword?: string;
  limit?: number;
  page?: number;
  sortField?: SortFieldEnum;
  sortType?: SortTypeEnum;
}

export interface IGetListTodoResponse {
  items: ITodo[];
  pagination: IPagination;
}

export interface IPagination {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface IGetTodoDetailParameter {
  id: string;
}

export interface IGetTodoDetailRequest extends Hapi.Request {
  parameter: IGetTodoDetailParameter;
}
