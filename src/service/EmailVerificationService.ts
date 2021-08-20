import { apiCaller } from './../utility/Axios';

const BASE_URL = '/email-verification';

export namespace EmailVerificationService {
  export function verify(id: string): Promise<any> {
    return apiCaller.post(`${BASE_URL}/${id}`);
  }

  export function resend(): Promise<any> {
    return apiCaller.post(`${BASE_URL}/resend`);
  }
}
