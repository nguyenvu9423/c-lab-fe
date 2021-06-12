import jwtDecode from 'jwt-decode';
import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { setToken } from '../../actions';

const initialState = {
  loadingState: LoadingState.LOAD_NEEDED,
  token: undefined
};

export const authenticationReducer = handleActions(
  {
    [setToken]: (state, action) => {
      const { token } = action.payload;
      if (token) {
        const parsedToken = jwtDecode(token.access_token);
        const { authorities } = parsedToken;
        const permissions = authorities.reduce((map, item) => {
          map[item] = true;
          return map;
        }, {});

        return {
          loadingState: LoadingState.LOADED,
          token: { ...token, payload: { permissions } }
        };
      } else {
        return {
          loadingState: LoadingState.WITHOUT,
          token: null
        };
      }
    }
  },
  initialState
);
