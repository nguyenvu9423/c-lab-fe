import axios from 'axios';
import { UnknownException } from '../shared/exceptions/UnkownException';
import { AuthProvider } from './authentication/tokenProvider';
import { BackEndConfig } from '../config';
import {
  BaseException,
  RateLimitExceededException,
} from '../shared/exceptions';

const instance = axios.create({
  baseURL: BackEndConfig.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 4000,
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthProvider.getToken();
    if (token) {
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token.access_token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.request.use(
  (config) => {
    const params = config.params;
    if (params?.page !== undefined) {
      return {
        ...config,
        params: {
          ...params,
          page: params.page - 1,
        },
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseError = error?.response?.data as BaseException;
    let parsedError: BaseException | undefined;

    if (responseError) {
      if (RateLimitExceededException.isInstance(responseError)) {
        parsedError = {
          ...responseError,
          message: RateLimitExceededException.toMessage(responseError),
        };
      } else {
        parsedError = responseError;
      }
    } else parsedError = UnknownException.createDefault();

    return Promise.reject(parsedError);
  },
);

export const apiCaller = instance;
