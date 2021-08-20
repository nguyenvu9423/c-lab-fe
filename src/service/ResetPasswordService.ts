import { apiCaller } from './../utility/Axios';
const BASE_URL = '/reset-password';

export namespace ResetPasswordService {
  export function isExist(id, token): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${id}`, {
      params: { token },
    });
  }

  export function requestResetPassword(username): Promise<any> {
    return apiCaller.post(
      `${BASE_URL}`,
      {},
      {
        params: {
          username,
        },
      }
    );
  }

  export function resetPassword(id, token, newPassword): Promise<any> {
    return apiCaller.post(
      `${BASE_URL}/${id}`,
      { newPassword },
      { params: { token } }
    );
  }
}
