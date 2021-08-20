import { Jwt } from './../../utility';
import { createAction } from '@reduxjs/toolkit';

const login = createAction('login', (token) => ({ payload: { token } }));
const logout = createAction('logout');

export interface SetTokenPayload {
  token: Jwt | null;
  isRefreshing?: boolean;
}

const setToken = createAction<SetTokenPayload>('setToken');

const clearToken = createAction('clearToken');
const refreshToken = { failed: createAction('refreshToken/failed') };

export { login, logout, setToken, clearToken, refreshToken };
