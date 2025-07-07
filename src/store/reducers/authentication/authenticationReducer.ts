import { createReducer } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { LoadingState } from './../../common';
import { AccessTokenPayload, Jwt } from './../../../utils/Token';
import { refreshToken, setToken } from '../../actions';
import { DataHolderState } from '../data-holders/shared';

export type AuthenticationState = DataHolderState<
  Record<string, unknown>,
  {
    token: Jwt;
    permissions: PermissionMap;
    accessTokenPayload: AccessTokenPayload;
  }
>;

export interface PermissionMap {
  [key: string]: boolean;
}

const initialState: AuthenticationState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const authenticationReducer = createReducer<AuthenticationState>(
  initialState,
  (builder) => {
    builder.addMatcher(
      (action) => setToken.match(action) || refreshToken.response.match(action),
      (state, action) => {
        const { token } = action.payload;
        if (token) {
          const accessTokenPayload = jwtDecode<AccessTokenPayload>(
            token.access_token,
          );

          const { authorities } = accessTokenPayload;

          const permissions =
            authorities?.reduce((map, item) => {
              map[item] = true;
              return map;
            }, {}) ?? {};

          return {
            loadingState: LoadingState.LOADED,
            token,
            permissions,
            accessTokenPayload,
          };
        } else {
          return {
            loadingState: LoadingState.WITHOUT,
          };
        }
      },
    );
  },
);
