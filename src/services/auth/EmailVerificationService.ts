import { apiCaller } from '../../utils/Axios';
import { EmailVerificationDTO } from '../dtos';

const BASE_URL = '/email-verification';

export namespace EmailVerificationService {
  export function verify(id: string): Promise<EmailVerificationDTO> {
    return apiCaller.post(`${BASE_URL}/${id}`);
  }

  export function resend(): Promise<void> {
    return apiCaller.post(`${BASE_URL}/resend`);
  }
}
