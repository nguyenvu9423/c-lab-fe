import { apiCaller } from '../utility/Axios';
import qs from 'qs';

const BASE_URL = '/oauth';

const client_id = 'log-n';

class AuthenticationService {
  static login({ username, password }) {
    return apiCaller.post(
      `${BASE_URL}/token`,
      qs.stringify({
        client_id,
        grant_type: 'password',
        username,
        password,
        scope: 'any',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
  static refreshToken(token) {
    return apiCaller.post(
      `${BASE_URL}/token`,
      qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: token,
        client_id,
        scope: 'any',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
}

export { AuthenticationService };
