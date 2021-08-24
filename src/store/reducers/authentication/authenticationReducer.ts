import { createReducer } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { LoadingState } from './../../common';
import { AccessToken, Jwt } from './../../../utility/Token';
import { setToken } from '../../actions';
import { DataHolderState } from '../data-holders/shared';

export type AuthenticationState = DataHolderState<
  Record<string, unknown>,
  {
    token: Jwt & { payload: { username: string; permissions: PermissionMap } };
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
    builder.addCase(setToken, (state, action) => {
      const { token } = action.payload;
      if (token) {
        const parsedToken = jwtDecode<AccessToken>(token.access_token);
        const { user_name, authorities } = parsedToken;
        const permissions =
          authorities?.reduce((map, item) => {
            map[item] = true;
            return map;
          }, {}) ?? {};

        return {
          loadingState: LoadingState.LOADED,
          token: {
            ...token,
            payload: { username: user_name, permissions },
          },
        };
      } else {
        return {
          loadingState: LoadingState.WITHOUT,
        };
      }
    });
  }
);
