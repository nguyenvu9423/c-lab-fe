import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { problemReducer } from '../data-reducers';
import { Target, createTargetChecker } from '../target';

const isWithTarget = createTargetChecker(Target.PROBLEM_DETAILS_PAGE);

export const problemDetailsPageReducer = combineReducers({
  data: filterActions(
    combineReducers({
      problem: problemReducer,
    }),
    isWithTarget
  ),
});
