import { Jwt } from '..';

export class AuthProvider {
  static setToken(token: Jwt | null): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static getToken(): Jwt | null {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr == null) {
      return null;
    }
    return JSON.parse(tokenStr);
  }

  static clearToken(): void {
    localStorage.removeItem('token');
  }
}
