import { combineReducers } from 'redux';
import { createFilteredReducer } from '../utils/createFilteredReducer';
import { Target, TargetPredicates } from './../target';
import { problemReducer, ProblemState } from '../data-holders';

export interface ProblemPageState {
  data: {
    problem: ProblemState;
  };
}

export const problemPageReducer = createFilteredReducer(
  combineReducers<ProblemPageState>({
    data: combineReducers({
      problem: problemReducer,
    }),
  }),
  TargetPredicates.equal(Target.PROBLEM_PAGE),
);
