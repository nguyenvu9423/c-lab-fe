import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchProblem } from '../../actions';
import { resetState } from '../../actions/state';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined
};

const problemReducer = handleActions(
  {
    [fetchProblem.request]: state => {
      return {
        ...state,
        loadingState: LoadingState.LOADING
      };
    },
    [fetchProblem.response]: (state, { error, payload }) => {
      if (!error) {
        const { problem } = payload;
        return {
          ...state,
          id: problem.id,
          loadingState: LoadingState.LOADED
        };
      } else {
        const {
          response: {
            data: { message }
          }
        } = payload;
        return {
          loadingState: LoadingState.ERROR,
          error: { message }
        };
      }
    },
    [resetState]: state => initialState
  },
  initialState
);

export { problemReducer };
