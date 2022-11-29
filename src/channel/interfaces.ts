import Hapi from '@hapi/hapi';
import { IPagination } from '../interfaces/common';
import { SortFieldEnum, SortTypeEnum, StatusChannelEnum } from './enums';

export interface IGetChannelParameter {
  limit?: string;
  page?: string;
  sortField?: SortFieldEnum;
  sortType?: SortTypeEnum;
}

export interface IGetChannelListRequest extends Hapi.Request {
  query: IGetChannelParameter;
}

export interface IGetChannelsQueryParams {
  status?: StatusChannelEnum;
  name?: string;
}

export interface IGetChannelListResponse {
  items: IChannel[];
  pagination: IPagination;
}

export interface IChannel {
  id: string;
  name: string;
  description?: string;
  avatar: string;
  icon: string;
  status: StatusChannelEnum;
  createdBy: string;
  editedBy: string;
}
