import { handleActions } from 'redux-actions';
import { fetchProblems } from '../actions/problem';

const problemOverviewReducer = handleActions(
  {
    [fetchProblems.request]: state => ({
      ...state,
      isFetching: true
    }),
    [fetchProblems.response]: (state, action) => {
      if (!action.error) {
        const { problems, totalPages, number } = action.payload;
        return {
          problems,
          totalPages,
          number,
          isFetching: false,
          error: undefined
        };
      }
    }
  },
  {
    problems: [],
    isFetching: false,
    error: undefined,
    totalPages: 0,
    number: 0
  }
);

export { problemOverviewReducer };
