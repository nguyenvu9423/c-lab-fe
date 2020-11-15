import * as axios from 'axios';
import { AuthProvider } from '../authentication/tokenProvider';
import { AuthService } from '../service/AuthService';
import { serverConfigs } from '../server';

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
    const token = AuthProvider.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token.access_token}`;
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
      const newToken = await AuthService.refreshToken(token.refresh_token);
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
