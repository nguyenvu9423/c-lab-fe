import { handleActions } from 'redux-actions';
import { setToken, clearToken } from '../../actions';
import jwtDecode from 'jwt-decode';

const initialState = null;

export const tokenReducer = handleActions(
  {
    [setToken]: (state, action) => {
      const token = action.payload;
      const parsedToken = jwtDecode(token.access_token);
      const { authorities } = parsedToken;
      const permissions = authorities.reduce((map, item) => {
        map[item] = true;
        return map;
      }, {});

      return { ...token, payload: { permissions } };
    },
    [clearToken]: () => null,
  },
  initialState
);
