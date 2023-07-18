export interface Jwt {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AccessTokenPayload {
  user_name: string;
  exp: number;
  authorities?: string[];
}

export interface RefreshTokenPayload {
  user_name: string;
  exp: number;
  authorities?: string[];
}
