import Hapi from '@hapi/hapi';
import { Method, StatusCode } from '../enums/http';
import { IGetChannelListRequest } from './interfaces';
import { getChannelListQueryValidator } from './validators';
import * as services from './services';
import { mapChannelsResponse } from './presenter';

const getListChannel: Hapi.ServerRoute = {
  method: Method.GET,
  path: '/channels',
  options: {
    description: 'Get list channel',
    tags: ['api', 'channel'],
    validate: {
      query: getChannelListQueryValidator
    },
    handler: async (
      hapiRequest: IGetChannelListRequest,
      hapiResponse: Hapi.ResponseToolkit
    ) => {
      const { query } = hapiRequest;
      const channels = await services.getChannelsByParameter({ ...query });
      return hapiResponse
        .response(mapChannelsResponse(channels))
        .code(StatusCode.OK);
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          [StatusCode.OK]: {
            description: 'Get List channels successfully'
          }
        }
      }
    }
  }
};

const channelHandlers: Hapi.ServerRoute[] = [getListChannel];

export default channelHandlers;
