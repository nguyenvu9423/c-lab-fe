import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { submissionsReducer, SubmissionsState } from './data-holders';
import { createTargetChecker, Target } from './target';

export interface ProblemUserSubmissionsState {
  data: {
    submissions: SubmissionsState;
  };
}

export const problemUserSubmissionsReducer = filterActions(
  combineReducers<ProblemUserSubmissionsState>({
    data: combineReducers({
      submissions: submissionsReducer,
    }),
  }),
  createTargetChecker(Target.PROBLEM_USER_SUBMISSIONS)
);
