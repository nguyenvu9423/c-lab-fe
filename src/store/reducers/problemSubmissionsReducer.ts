import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { createTargetChecker, Target } from './target';
import { submissionsReducer } from './data-holders';
import { submissionFilterReducer, SubmissionFilterState } from './ui-reducers';
import { SubmissionsState } from './data-holders';

export interface ProblemSubmissionsState {
  data: {
    submissions: SubmissionsState;
  };
  ui: {
    filters: SubmissionFilterState;
  };
}

const problemSubmissionsReducer = filterActions(
  combineReducers<ProblemSubmissionsState>({
    data: combineReducers({
      submissions: submissionsReducer,
    }),
    ui: combineReducers({
      filters: submissionFilterReducer,
    }),
  }),
  createTargetChecker(Target.PROBLEM_SUBMISSIONS)
);

export { problemSubmissionsReducer };
