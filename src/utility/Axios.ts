import axios from 'axios';
import { UnknownException } from './../exception/UnkownException';
import { serverConfigs } from '../server';
import { AuthProvider } from '../authentication/tokenProvider';

const instance = axios.create({
  baseURL: serverConfigs.getBaseURL(),
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
      config.headers['Authorization'] = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseError = error?.response?.data;

    if (responseError) return Promise.reject(responseError);
    else return Promise.reject(UnknownException.createDefault());
  }
);

export const apiCaller = instance;
