import { IChannel, IGetChannelListResponse } from './interfaces';

const mapBaseCustomerProfile = (data: IChannel): any => {
  return {
    id: data.id,
    name: data.name,
    status: data.status
  };
};

export const mapChannelResponse = (data: IChannel): any => ({
  ...mapBaseCustomerProfile(data)
});

export const mapChannelsResponse = (result: IGetChannelListResponse): any => {
  result.items = result.items.map(document => mapChannelResponse(document));
  return result;
};
