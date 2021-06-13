import { handleActions } from 'redux-actions';
import { userReducerMap } from '../data-reducers';
import { LoadingState } from '../../common';
import { setToken } from '../../actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
};

const principalReducerMap = {
  ...userReducerMap,
  [setToken]: (state, action) => {
    const { token } = action.payload;
    if (token === null) {
      return {
        loadingState: LoadingState.WITHOUT,
      };
    }
    if (state.loadingState !== LoadingState.LOADED)
      return {
        loadingState: LoadingState.LOAD_NEEDED,
      };

    return state;
  },
};

export const principalReducer = handleActions(
  principalReducerMap,
  initialState
);
