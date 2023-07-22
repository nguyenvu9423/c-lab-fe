import { UserDTO } from '@/services/dtos';
import { apiCaller } from '../../utils/Axios';
import { ServiceResponse } from '../types';

export namespace RegisterService {
  export function register(
    userDTO: Partial<UserDTO>
  ): ServiceResponse<UserDTO> {
    return apiCaller.post('/register', userDTO);
  }
}
