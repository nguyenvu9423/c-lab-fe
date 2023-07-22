import { PermissionDTO } from './PermissionDTO';

export interface RoleDTO {
  id: number;

  name: string;

  permissions: PermissionDTO[];
}
