export interface Jwt {
  access_token: string;
}

export interface AccessToken {
  user_name: string;
  authorities?: string[];
}
