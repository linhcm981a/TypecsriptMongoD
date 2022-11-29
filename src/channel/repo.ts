import * as _ from 'lodash';
import { IPaginationParams } from '../interfaces/common';
import { IChannel, IGetChannelsQueryParams } from './interfaces';
import { ChannelModel, ChannelDocument } from './model';

export const documentToObject = (document: ChannelDocument) =>
  document.toObject({ getters: true }) as IChannel;

export const documentToArray = (documents: ChannelDocument[]) =>
  documents.map(document => documentToObject(document));

export const getChannelsByParameter = async (
  queryParams: IGetChannelsQueryParams,
  paginationParams: IPaginationParams
): Promise<IChannel[]> => {
  const { limit, offset, sortField, sortType } = paginationParams;
  const query = _.pickBy(queryParams, _.identity);

  const channels = await ChannelModel.find(query)
    .limit(limit)
    .skip(offset)
    .sort({ [sortField]: sortType })
    .exec();

  return channels && documentToArray(channels);
};

export const getChannelDetail = async (
  id: string
): Promise<IChannel | null> => {
  const channel = await ChannelModel.findById(id).exec();
  return channel && documentToObject(channel);
};

export const countByParameter = async (
  queryParams: IGetChannelsQueryParams
): Promise<number> => {
  const query = _.pickBy(queryParams, _.identity);
  const countTotal = await ChannelModel.count(query).exec();

  return countTotal;
};
