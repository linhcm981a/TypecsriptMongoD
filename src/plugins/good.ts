const good = require('@hapi/good');
import logger from '../logger';

const goodWinstonOptions = {
  levels: {
    response: 'debug',
    error: 'info'
  }
};

const options = {
  ops: {
    interval: 1000
  },
  reporters: {
    winston2: [
      {
        module: 'hapi-good-winston',
        name: 'goodWinston',
        args: [logger, goodWinstonOptions]
      }
    ]
  }
};

export default {
  plugin: good,
  options: options
};
