import QueryString, * as qs from 'qs';
import { apiCaller } from '../../utils/Axios';
import { ServiceResponse } from '../types';
import { Jwt } from '../../utils';
import { PkceUtils } from '@/utils/Pkce';
import { BackEndConfig } from 'src/config';

const BASE_URL = '/oauth2';

const client_id = 'c-lab';

export namespace AuthenticationService {
  export function refreshToken(refreshToken: string): ServiceResponse<Jwt> {
    return apiCaller.post(
      `${BASE_URL}/token`,
      qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id,
        scope: 'openid',
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
  }

  export function authorize(
    authCode: string,
    codeVerifier: string,
  ): ServiceResponse {
    const payload = QueryString.stringify({
      grant_type: 'authorization_code',
      client_id: 'c-lab',
      code: authCode,
      code_verifier: codeVerifier,
      redirect_uri: 'https://localhost:3000/authorized',
      scope: 'openid',
    });

    return apiCaller.post(`${BASE_URL}/token`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  export async function login(codeVerifier: string): Promise<void> {
    const codeChallenge = await PkceUtils.generateCodeChallenge(codeVerifier);

    const query = QueryString.stringify({
      response_type: 'code',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      client_id: 'c-lab',
      redirect_uri: `${window.location.origin}/authorized`,
      scope: 'openid',
    });

    window.location.href = `${BackEndConfig.API_URL}/oauth2/authorize?` + query;
  }

  export function logout(): ServiceResponse {
    return apiCaller.post(`/logout`, undefined, { withCredentials: true });
  }
}
