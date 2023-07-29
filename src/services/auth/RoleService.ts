import { RoleDTO } from '../dtos';
import { Pageable } from '../../utils';
import { apiCaller } from '../../utils/Axios';
import { Page, ServiceResponse } from '../types';

const BASE_URL = '/roles';

export namespace RoleService {
  export function getRoles(params?: {
    pageable?: Pageable;
  }): ServiceResponse<Page<RoleDTO>> {
    const { pageable } = params ?? {};
    return apiCaller.get(BASE_URL, {
      params: { ...pageable },
    });
  }

  export function getRole(id: number): ServiceResponse<RoleDTO> {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  export function updateRole(
    id: number,
    role: RoleDTO,
  ): ServiceResponse<RoleDTO> {
    return apiCaller.put(`${BASE_URL}/${id}`, role);
  }

  export function addRole(role: RoleDTO): ServiceResponse<RoleDTO> {
    return apiCaller.post(`${BASE_URL}`, role);
  }
}
