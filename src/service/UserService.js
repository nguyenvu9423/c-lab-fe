import Axios from '../utility/Axios';
const USER_API_BASE_URL = '/users';

class UserService {
  static async register(userDTO) {
    return Axios.post(USER_API_BASE_URL, userDTO);
  }

  static async login(userDTO) {
    return Axios.post('/login', userDTO);
  }
}

export default UserService;
