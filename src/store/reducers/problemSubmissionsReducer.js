import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { createTargetChecker, Target } from './target';
import { submissionsReducer } from './data-reducers';
import { submissionFilterReducer } from './ui-reducers';

const isWithTarget = createTargetChecker(Target.PROBLEM_SUBMISSIONS);

const problemSubmissionsReducer = filterActions(
  combineReducers({
    data: combineReducers({
      submissions: submissionsReducer
    }),
    ui: combineReducers({
      filters: submissionFilterReducer
    })
  }),
  isWithTarget
);

export { problemSubmissionsReducer };
