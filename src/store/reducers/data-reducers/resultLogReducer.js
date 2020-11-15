import { LoadingState } from '../../common';
import { handleActions } from 'redux-actions';
import { fetchSubmissionResultLog } from '../../actions';

const initialState = {
  resultLog: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined
};

const resultLogReducer = handleActions(
  {
    [fetchSubmissionResultLog.request]: () => ({
      loadingState: LoadingState.LOADING
    }),
    [fetchSubmissionResultLog.response]: (state, action) => {
      if (!action.error) {
        const { resultLog } = action.payload;
        return {
          resultLog,
          loadingState: LoadingState.LOADED
        };
      } else {
        return {
          loadingState: LoadingState.ERROR,
          error: action.error
        };
      }
    }
  },
  initialState
);

export { resultLogReducer };
