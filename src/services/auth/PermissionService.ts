import { apiCaller } from '../../utils/Axios';
import { ServiceResponse } from '../types';
import { PermissionDTO } from '../dtos';

const BASE_URL = '/permissions';

export namespace PermissionService {
  export function getPermissions(): ServiceResponse<PermissionDTO[]> {
    return apiCaller.get(BASE_URL);
  }
}
