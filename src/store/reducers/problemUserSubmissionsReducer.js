import handleActions from 'redux-actions/lib/handleActions';
import { fetchSubmissionsByUserAndProblem, createSubmission } from '../actions';
import { LoadingState } from '../common';

const initialState = {
  submissions: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  activePage: 0
};

const problemUserSubmissionsReducer = handleActions(
  {
    [createSubmission.response]: () => initialState,
    [fetchSubmissionsByUserAndProblem.request]: state => {
      return { ...state, submissions: [], loadingState: LoadingState.LOADING };
    },
    [fetchSubmissionsByUserAndProblem.response]: (state, action) => {
      const { submissions, totalPages, activePage } = action.payload;
      return {
        submissions,
        loadingState: LoadingState.LOADED,
        totalPages,
        activePage
      };
    }
  },
  initialState
);

export { problemUserSubmissionsReducer, initialState };
