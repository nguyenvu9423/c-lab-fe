import { handleActions } from 'redux-actions';

const initialState = [];

const submissionFilterReducer = handleActions(
  {
    setSubmissionFilter: (state, action) => {
      const { filters } = action.payload;
      return filters;
    },
  },
  initialState
);

export { submissionFilterReducer };
