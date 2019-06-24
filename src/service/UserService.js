import * as qs from 'qs';

const USER_API_BASE_URL = '/users';
import { apiCaller } from '../utility/Axios';

class UserService {
  static async getLoginUser() {
    return apiCaller.get(USER_API_BASE_URL + '/me');
  }

  static async getUserById(id) {
    return apiCaller.get(`${USER_API_BASE_URL}/${id}`);
  }

  static async getUserByUsername(username) {
    return apiCaller.get(USER_API_BASE_URL, {
      params: {
        username: username
      }
    });
  }
  static async register(userDTO) {
    return apiCaller.post(USER_API_BASE_URL + '/register', userDTO);
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
