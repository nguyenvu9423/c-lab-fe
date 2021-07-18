import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { problemReducer, ProblemState } from '../data-holders';
import { Target, createTargetChecker } from '../target';

export interface ProblemPageState {
  data: {
    problem: ProblemState;
  };
}

export const problemPageReducer = combineReducers({
  data: filterActions(
    combineReducers({
      problem: problemReducer,
    }),
    createTargetChecker(Target.PROBLEM_DETAILS_PAGE)
  ),
});
