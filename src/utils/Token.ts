export interface Jwt {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface AccessTokenPayload {
  sub: string;
  exp: number;
  authorities?: string[];
}

export interface RefreshTokenPayload {
  sub: string;
  exp: number;
  authorities?: string[];
}
