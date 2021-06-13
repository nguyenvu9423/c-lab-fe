import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { problemsReducer } from '../data-reducers';
import { createTargetChecker, Target } from '../target';

const problemsPageReducer = filterActions(
  combineReducers({
    data: combineReducers({
      problems: problemsReducer,
    }),
  }),
  createTargetChecker(Target.PROBLEMS_PAGE)
);

export { problemsPageReducer };
