import { apiCaller } from '../utility/Axios';
import * as qs from 'qs';

const AUTH_TOKEN_URL = '/oauth/token';
class AuthService {
  static async getToken(user) {
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

  static async refreshToken(token) {
    return apiCaller.post(
      AUTH_TOKEN_URL,
      qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token
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

export { AuthService };
