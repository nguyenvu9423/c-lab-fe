import { handleActions } from 'redux-actions';
import { fetchDetailedSubmissionById } from '../../actions';
import { LoadingState } from '../../common';

const initialState = {
  submissionId: undefined,
  code: undefined,
  resultLog: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined
};

const detailedSubmissionReducer = handleActions(
  {
    [fetchDetailedSubmissionById.request]: () => ({
      loadingState: LoadingState.LOADING
    }),
    [fetchDetailedSubmissionById.response]: (state, { error, payload }) => {
      if (!error) {
        const { submissionId, code, resultLog } = payload;
        return {
          submissionId,
          code,
          resultLog,
          loadingState: LoadingState.LOADED
        };
      } else {
        return { loadingState: LoadingState.ERROR, error };
      }
    }
  },
  initialState
);

export { detailedSubmissionReducer };
