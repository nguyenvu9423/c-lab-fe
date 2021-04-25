import { apiCaller } from '../utility/Axios';

export class RegisterService {
  static async register(userDTO) {
    return apiCaller.post('/register', userDTO);
  }
}
