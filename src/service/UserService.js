const USER_API_BASE_URL = '/users';
import { apiCaller } from '../utility/Axios';

class UserService {
  static async register(userDTO) {
    return apiCaller.post(USER_API_BASE_URL + '/register', userDTO);
  }

  static async getLoginUser() {
    return apiCaller.get(USER_API_BASE_URL + '/me');
  }

  static async getUserById(id) {
    return apiCaller.get(`${USER_API_BASE_URL}/${id}`);
  }

  static async getUserByUsername(username) {
    return apiCaller.get(USER_API_BASE_URL, {
      params: {
        username: username
      }
    });
  }

  static async updateUserDetails(id, userDTO) {
    return apiCaller.put(`${USER_API_BASE_URL}/${id}`, userDTO);
  }

  static async updateAvatar(username, formData) {
    return apiCaller.post(`${USER_API_BASE_URL}/${username}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async updateUserPassword(username, changePasswordDTO) {
    return apiCaller.post(
      `${USER_API_BASE_URL}/${username}/change-password`,
      changePasswordDTO
    );
  }
}

export default UserService;
