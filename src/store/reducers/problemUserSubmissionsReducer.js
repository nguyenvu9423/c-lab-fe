import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { submissionsReducer } from './data-reducers';
import { createTargetChecker, Target } from './target';

const isWithTarget = createTargetChecker(Target.PROBLEM_USER_SUBMISSIONS);

const problemUserSubmissionsReducer = combineReducers({
  data: filterActions(
    combineReducers({
      submissions: submissionsReducer
    }),
    isWithTarget
  )
});

export { problemUserSubmissionsReducer };
