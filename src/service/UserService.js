import * as qs from 'qs';
const PUBLIC_USER_API_BASE_URL = '/public/users';
const USER_API_BASE_URL = '/users';
import { apiCaller } from '../utility/Axios';

class UserService {
  static async getLoginUser() {
    return apiCaller.get(USER_API_BASE_URL + '/me');
  }

  static async register(userDTO) {
    return apiCaller.post(PUBLIC_USER_API_BASE_URL + '/register', userDTO);
  }

  static async login(user) {
    return apiCaller.post(
      '/oauth/token',
      qs.stringify({
        username: user.username,
        password: user.password,
        grant_type: 'password'
      }),
      {
        auth: {
          username: 'client',
          password: '32199400'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
}

export default UserService;
