import { LoadingState } from '../../common';
import handleActions from 'redux-actions/lib/handleActions';
import { fetchDetailedSubmission } from '../../actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
};

const submissionReducer = handleActions(
  {
    [fetchDetailedSubmission.request]: () => ({
      loadingState: LoadingState.LOADING,
    }),
    [fetchDetailedSubmission.response]: (state, { error, payload }) => {
      if (!error) {
        const { detailedSubmission } = payload;
        return {
          id: detailedSubmission.id,
          loadingState: LoadingState.LOADED,
        };
      } else {
        const {
          data: { message },
        } = payload.response;
        return { loadingState: LoadingState.ERROR, error: { message } };
      }
    },
  },
  initialState
);

export { submissionReducer };
