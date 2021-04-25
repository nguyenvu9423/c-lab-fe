import { apiCaller } from '../utility/Axios';
import qs from 'qs';

const BASE_URL = '/oauth';

class AuthenticationService {
  static login({ username, password }) {
    return apiCaller.post(
      `${BASE_URL}/token`,
      qs.stringify({
        client_id: 'log-n',
        grant_type: 'password',
        username,
        password,
        scope: 'any'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }
}

export { AuthenticationService };
