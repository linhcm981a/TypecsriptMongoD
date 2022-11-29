const VALIDATIONS = {
  DECIMAL_PRECISION: 2,
  MAX_LENGTH_ACCOUNT_NUMBER: 40,
  DEFAULT_RETRY_OPTIONS: {
    NUMBER_OF_RETRIES: 3,
    DELAY_IN_MS: 100
  },
  EMPTY_STRING: ''
};

const Tracing = {
  TRACER_SESSION: 'TRACER_SESSION',
  TRANSACTION_ID: 'x-request-id'
};

const promiseSettledStatus = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
};

const HTTP_HEADERS = {
  AUTH: 'Authorization'
};

const CLS_NAMESPACE = 'requestContext';

const OAUTH_CLIENT_TYPE = {
  BASIC: 'basic_oauth_client',
  ADVANCED: 'advanced_oauth_client'
};

const PREFIX_TOKEN = 'Bearer ';

const AUTH_STRATEGY = 'jwt';

export const GET_LIST_DEFAULT_LIMIT = 20;

export const GET_LIST_MIN_LIMIT = 20;

export const GET_LIST_MAX_LIMIT = 30;

export const GET_LIST_MIN_PAGE = 1;

export const GET_LIST_DEFAULT_PAGE = 1;

export const GET_LIST_DEFAULT_SORT_TYPE = -1;

export {
  Tracing,
  promiseSettledStatus,
  HTTP_HEADERS,
  CLS_NAMESPACE,
  OAUTH_CLIENT_TYPE,
  PREFIX_TOKEN,
  AUTH_STRATEGY,
  VALIDATIONS
};
