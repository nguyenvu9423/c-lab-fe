export interface User {
  id: number;

  username: string;

  firstName: string;

  lastName: string;

  email: string;

  workplace: string;

  birthDay: string;

  avatarUrl?: string;

  emailVerified: boolean;

  banned: boolean;
}
