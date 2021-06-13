import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchUser, clearUser } from '../../actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
};

export const userReducerMap = {
  [fetchUser.request]: () => {
    return {
      loadingState: LoadingState.LOADING,
    };
  },
  [fetchUser.response]: (state, { error, payload }) => {
    if (!error) {
      const { user } = payload;
      return {
        id: user,
        loadingState: LoadingState.LOADED,
      };
    } else {
      const {
        response: {
          data: { message },
        },
      } = payload;
      return {
        loadingState: LoadingState.ERROR,
        error: {
          message,
        },
      };
    }
  },
  [clearUser]: () => {
    return { loadingState: LoadingState.LOAD_NEEDED };
  },
};

export const userReducer = handleActions(userReducerMap, initialState);
