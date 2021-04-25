import * as axios from 'axios';
import { AuthProvider } from '../authentication/tokenProvider';
import { AuthenticationService } from '../service/AuthenticationService';
import { serverConfigs } from '../server';
import { currentToken } from '../store';

const instance = axios.create({
  baseURL: serverConfigs.getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 4000
});

instance.interceptors.request.use(
  config => {
    if (currentToken) {
      config.headers['Authorization'] = `Bearer ${currentToken.access_token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    const { data, status } = response;
    if (status === 401 && data.error === 'invalid_token') {
      return callAfterRefreshToken(error);
    }
    return Promise.reject(error);
  }
);

export let apiCaller = instance;

let requestQueue = [];
let isRefreshingToken = false;

async function callAfterRefreshToken(error) {
  const {
    response: { config }
  } = error;
  let token = AuthProvider.getToken();
  const originalRequest = new Promise(resolve => {
    addRequestToQueue(token => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token.access_token}`;
      } else {
        config.headers['Authorization'] = undefined;
      }
      resolve(axios.request(config));
    });
  });
  if (!isRefreshingToken) {
    isRefreshingToken = true;
    try {
      const newToken = await AuthenticationService.refreshToken(
        token.refresh_token
      );
      AuthProvider.setToken(newToken);
    } catch {
      AuthProvider.clearToken();
    } finally {
      processQueue();
    }
    isRefreshingToken = false;
  }
  return originalRequest;
}
function addRequestToQueue(request) {
  requestQueue.push(request);
}

function processQueue() {
  const token = AuthProvider.getToken();
  requestQueue.forEach(callback => callback(token));
  requestQueue = [];
}
