import { EmailVerificationDTO } from '../domains/email-verification';
import { apiCaller } from '../utils/Axios';

const BASE_URL = '/email-verification';

export namespace EmailVerificationService {
  export function verify(id: string): Promise<EmailVerificationDTO> {
    return apiCaller.post(`${BASE_URL}/${id}`);
  }

  export function resend(): Promise<void> {
    return apiCaller.post(`${BASE_URL}/resend`);
  }
}
