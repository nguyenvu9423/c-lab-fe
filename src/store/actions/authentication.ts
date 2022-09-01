import { Jwt } from './../../utility';
import { createAction } from '@reduxjs/toolkit';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';

export const login = createAction('login', (token) => ({ payload: { token } }));
export const logout = createAction('logout');

export interface SetTokenPayload {
  token: Jwt | null;
}

export const setToken = createAction<SetTokenPayload>('setToken');

export const clearToken = createAction('clearToken');

export namespace RefreshToken {
  export type RequestPayload = BaseFetchPayload;

  export interface ResponsePayload extends BaseFetchPayload, SetTokenPayload {}

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const refreshToken = {
  request: createAction<RefreshToken.RequestPayload | undefined>(
    'refreshToken/request'
  ),
  response: createAction<RefreshToken.ResponsePayload>('refreshToken/response'),
  failed: createAction(
    'refreshToken/failed',
    (payload: RefreshToken.ErrorPayload) => ({ payload, error: true })
  ),
};
