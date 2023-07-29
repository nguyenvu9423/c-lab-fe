import { combineReducers } from 'redux';
import { submissionsReducer } from './data-holders';
import { submissionFilterReducer, SubmissionFilterState } from './ui-reducers';
import { SubmissionsState } from './data-holders';
import { Target, TargetPredicates } from './target';
import { createFilteredReducer } from './utils/createFilteredReducer';

export interface ProblemSubmissionsState {
  data: {
    submissions: SubmissionsState;
  };
  ui: {
    filters: SubmissionFilterState;
  };
}

export const problemSubmissionsReducer = createFilteredReducer(
  combineReducers<ProblemSubmissionsState>({
    data: combineReducers({
      submissions: submissionsReducer,
    }),
    ui: combineReducers({
      filters: submissionFilterReducer,
    }),
  }),
  TargetPredicates.equal(Target.ProblemPageContents.SUBMISSIONS),
);
