import { fetchSubmissionsByProblem } from '../actions/submission';
import { handleActions } from 'redux-actions';

const initialState = {
  submissions: [],
  isFetching: false,
  error: undefined,
  totalPages: 0,
  activePage: 0
};

const problemSubmissionsReducer = handleActions(
  {
    [fetchSubmissionsByProblem.request]: state => ({
      ...state,
      isFetching: true
    }),
    [fetchSubmissionsByProblem.response]: (state, action) => {
      if (!action.error) {
        const { submissions, totalPages, activePage } = action.payload;
        return {
          submissions,
          totalPages,
          activePage,
          isFetching: false,
          error: undefined
        };
      } else {
        return {
          ...initialState,
          error: 'This is error'
        };
      }
    }
  },
  initialState
);

export { problemSubmissionsReducer };
