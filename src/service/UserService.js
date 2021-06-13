const USER_API_BASE_URL = '/users';
import { apiCaller } from '../utility/Axios';

export class UserService {
  static async getUsers(pageable) {
    return apiCaller.get(USER_API_BASE_URL, { params: { pageable } });
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
        username: username,
      },
    });
  }

  static async getUsersByFilters(filters, pageable = { page: 0, size: 10 }) {
    return apiCaller.get(USER_API_BASE_URL, {
      params: {
        filters,
        ...pageable,
      },
    });
  }

  static async updateUserDetails(id, userDTO) {
    return apiCaller.put(`${USER_API_BASE_URL}/${id}`, userDTO);
  }

  static async updateAvatar(formData) {
    return apiCaller.post(`${USER_API_BASE_URL}/me/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async updateUserPassword(username, changePasswordDTO) {
    return apiCaller.post(
      `${USER_API_BASE_URL}/${username}/change-password`,
      changePasswordDTO
    );
  }
}
