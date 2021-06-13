import { LoadingState } from '../../common';
import { fetchTag } from '../../actions';
import { handleActions } from 'redux-actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
};

export const tagReducer = handleActions(
  {
    [fetchTag.request]: () => {
      return {
        ...initialState,
        loadingState: LoadingState.LOADING,
      };
    },
    [fetchTag.response]: (state, { payload, error }) => {
      if (!error) {
        const { tag } = payload;
        return {
          id: tag,
          loadingState: LoadingState.LOADED,
          error: undefined,
        };
      } else {
        const { response } = payload;
        return {
          error: { message: response.data.message },
        };
      }
    },
  },
  initialState
);
