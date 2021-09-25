import { PermissionDTO } from '../domains/role';
import { apiCaller } from '../utility/Axios';
import { ServiceResponse } from './types';

const BASE_URL = '/permissions';

export namespace PermissionService {
  export function getPermissions(): ServiceResponse<PermissionDTO[]> {
    return apiCaller.get(BASE_URL);
  }
}
