import { createReducer } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { LoadingState } from './../../common';
import { AccessToken, Jwt } from './../../../utility/Token';
import { setToken } from '../../actions';

export interface AuthenticationState {
  loadingState: LoadingState;
  token?:
    | (Jwt & { payload: { permissions: { [key: string]: boolean } } })
    | null;
}

const initialState: AuthenticationState = {
  loadingState: LoadingState.LOAD_NEEDED,
  token: undefined,
};

// const authenticationReducerbk = handleActions(
//   {
//     [setToken]: (state, action) => {
//       const { token } = action.payload;
//       if (token) {
//         const parsedToken = jwtDecode(token.access_token);
//         const { authorities } = parsedToken;
//         const permissions = authorities.reduce((map, item) => {
//           map[item] = true;
//           return map;
//         }, {});

//         return {
//           loadingState: LoadingState.LOADED,
//           token: { ...token, payload: { permissions } },
//         };
//       } else {
//         return {
//           loadingState: LoadingState.WITHOUT,
//           token: null,
//         };
//       }
//     },
//   },
//   initialState
// );

export const authenticationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setToken, (state, action) => {
    const { token } = action.payload;
    if (token) {
      const parsedToken = jwtDecode<AccessToken>(token.access_token);
      const { authorities } = parsedToken;
      const permissions = authorities.reduce((map, item) => {
        map[item] = true;
        return map;
      }, {});

      state.loadingState = LoadingState.LOADED;
      state.token = { ...token, payload: { permissions } };
    } else {
      state.loadingState = LoadingState.WITHOUT;
      state.token = null;
    }
  });
});
