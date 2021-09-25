import { RoleDTO } from '../role';

export interface User {
  id: number;

  username: string;

  firstName: string;

  lastName: string;

  email: string;

  workplace: string;

  birthday?: string;

  avatarUrl?: string;

  emailVerified: boolean;

  banned: boolean;

  role: RoleDTO;
}
