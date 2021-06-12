import { apiCaller } from '../utility/Axios';

const BASE_URL = '/roles';

export class RoleService {
  static getAllRoles(pageable) {
    return apiCaller.get(`${BASE_URL}`, {
      params: { page: pageable.page, size: pageable.size }
    });
  }

  static getRole(id) {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  static updateRole(id, role) {
    return apiCaller.put(`${BASE_URL}/${id}`, role);
  }

  static addRole(role) {
    return apiCaller.post(`${BASE_URL}`, role);
  }
}
