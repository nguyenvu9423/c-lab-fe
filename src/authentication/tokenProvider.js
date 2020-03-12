class AuthProvider {
  static setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  static getToken() {
    const tokenStr = localStorage.getItem('token');
    if (tokenStr == null) {
      return null;
    }
    return JSON.parse(tokenStr);
  }

  static clearToken() {
    localStorage.removeItem('token');
  }

  static getRefreshToken() {
    return AuthProvider.getToken().refresh_token;
  }
}
export { AuthProvider };
