import { LoadingState } from '../../common';
import { fetchRole, resetState } from '../../actions';
import { handleActions } from 'redux-actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
};

export const roleReducer = handleActions(
  {
    [fetchRole.request]: () => ({ loadingState: LoadingState.LOADING }),
    [fetchRole.response]: (state, { error, payload }) => {
      if (!error) {
        const { role } = payload;
        return {
          ...state,
          id: role.id,
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
          error: { message },
        };
      }
    },
    [resetState]: () => initialState,
  },
  initialState
);
