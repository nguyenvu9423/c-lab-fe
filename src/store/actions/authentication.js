import { createAction } from '@reduxjs/toolkit';

const login = createAction('login');
const logout = createAction('logout');

const setToken = createAction('setToken');
const clearToken = createAction('clearToken');
const refreshToken = { failed: createAction('refreshToken/failed') };

export { login, logout, setToken, clearToken, refreshToken };
