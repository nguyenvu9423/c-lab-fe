import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchProblemRejudge } from '../../actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
};

const problemRejudgeReducer = handleActions(
  {
    [fetchProblemRejudge.request]: () => {
      return {
        loadingState: LoadingState.LOADING,
      };
    },
    [fetchProblemRejudge.response]: (state, action) => {
      const { error, payload } = action;
      if (!error) {
        const { problemRejudge } = payload;
        return {
          ...state,
          id: problemRejudge.id,
          loadingState: LoadingState.LOADED,
        };
      } else {
        const { error } = payload;
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error,
        };
      }
    },
  },
  initialState
);

export { problemRejudgeReducer };
