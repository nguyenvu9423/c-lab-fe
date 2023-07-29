import * as qs from 'qs';
import { apiCaller } from '../../utils/Axios';
import { ServiceResponse } from '../types';
import { Jwt } from '../../utils';

const BASE_URL = '/oauth';

const client_id = 'log-n';

export namespace AuthenticationService {
  export function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): ServiceResponse<Jwt> {
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
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }

  export function refreshToken(refreshToken: string): ServiceResponse<Jwt> {
    return apiCaller.post(
      `${BASE_URL}/token`,
      qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id,
        scope: 'any',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }
}
