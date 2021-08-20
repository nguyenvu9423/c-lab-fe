import { Target } from './../target';
import { ProblemState } from './../data-holders/problemReducer';
import { combineReducers } from 'redux';
import { problemReducer } from '../data-holders';
import { createFilteredReducer } from '../utils';
import { TargetPredicates } from '../target';

export interface EditProblemPageState {
  data: {
    problem: ProblemState;
  };
}

export const editProblemPageReducer = createFilteredReducer(
  combineReducers<EditProblemPageState>({
    data: combineReducers({
      problem: problemReducer,
    }),
  }),
  TargetPredicates.equal(Target.EDIT_PROBLEM_PAGE)
);
