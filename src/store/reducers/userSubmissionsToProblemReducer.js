import handleActions from 'redux-actions/lib/handleActions';
import {
  fetchSubmissionsByUserAndProblem,
  createSubmission,
  userSubmissionToProblem
} from '../actions';
import { LoadingState } from '../common';

const initialState = {
  submissions: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  activePage: 0
};

const userSubmissionsToProblemReducer = handleActions(
  {
    [createSubmission.request]: () => initialState,
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
    },
    [userSubmissionToProblem.resetState]: () => initialState
  },
  initialState
);

export { userSubmissionsToProblemReducer, initialState };
