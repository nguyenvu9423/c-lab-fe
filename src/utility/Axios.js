import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 1000
});

instance.interceptors.request.use(
  config => {
    const tokenDataJSON = localStorage.getItem('token');
    if (tokenDataJSON) {
      const tokenData = JSON.parse(tokenDataJSON);
      config.headers['Authorization'] = `Bearer ${tokenData.access_token}`;
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
    if (error.response) {
      return Promise.reject(error);
    } else if (error.request) {
    } else {
      console.log('Error', error.message);
    }
  }
);

export let apiCaller = instance;
