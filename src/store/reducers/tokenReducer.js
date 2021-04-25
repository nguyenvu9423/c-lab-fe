import { handleActions } from 'redux-actions';
import { setToken, clearToken } from '../actions/token';
import { AuthProvider } from '../../authentication/tokenProvider';

const initialState = AuthProvider.getToken() ?? null;

export const tokenReducer = handleActions(
  {
    [setToken]: (state, action) => {
      const token = action.payload;
      return token;
    },
    [clearToken]: () => null
  },
  initialState
);
