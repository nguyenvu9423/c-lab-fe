import { ChangePasswordDTO, UserDTO } from '../domains/user';
import { Pageable } from '../utils';
import { apiCaller } from '../utils/Axios';
import { Page, ServiceResponse } from './types';

const BASE_URL = '/users';

export namespace UserService {
  export function getAll(
    query?: string,
    pageable?: Pageable
  ): ServiceResponse<Page<UserDTO>> {
    return apiCaller.get(BASE_URL, { params: { ...pageable, query } });
  }

  export function getById(id: number | string): ServiceResponse<UserDTO> {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  export function getByUsername(username: string): ServiceResponse<UserDTO> {
    return apiCaller.get(`${BASE_URL}/${username}`);
  }

  export function update(
    username: string,
    userDTO: UserDTO
  ): ServiceResponse<UserDTO> {
    return apiCaller.put(`${BASE_URL}/${username}`, userDTO);
  }

  export function updateInfo(
    username: string,
    userDTO: UserDTO
  ): ServiceResponse<UserDTO> {
    return apiCaller.put(`${BASE_URL}/${username}/info`, userDTO);
  }

  export function updateAvatar(
    username: string,
    formData: FormData
  ): ServiceResponse<UserDTO> {
    return apiCaller.post(`${BASE_URL}/${username}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  export function updatePassword(
    username: string,
    changePasswordDTO: ChangePasswordDTO
  ): ServiceResponse<UserDTO> {
    return apiCaller.post(
      `${BASE_URL}/${username}/change-password`,
      changePasswordDTO
    );
  }
}
