import * as axios from 'axios';
import eventEmitter from './EventEmitter';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 1000
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      eventEmitter.emit('message', error.response);
      return Promise.reject(error);
    } else if (error.request) {
    } else {
      console.log('Error', error.message);
    }
  }
);
export default instance;
