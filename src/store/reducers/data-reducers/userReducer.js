import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchUser } from '../../actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined
};

export const userReducer = handleActions(
  {
    [fetchUser.request]: () => {
      return {
        loadingState: LoadingState.LOADING
      };
    },
    [fetchUser.response]: (state, { error, payload }) => {
      if (!error) {
        const { user } = payload;
        return {
          id: user,
          loadingState: LoadingState.LOADED
        };
      } else {
        const {
          response: {
            data: { message }
          }
        } = payload;
        return {
          error: {
            message
          }
        };
      }
    }
  },
  initialState
);
