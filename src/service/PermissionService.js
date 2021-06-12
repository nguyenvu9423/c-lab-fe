import { apiCaller } from '../utility/Axios';

const BASE_URL = '/permissions';

export class PermissionService {
  static getAll() {
    return apiCaller.get(BASE_URL);
  }
}
