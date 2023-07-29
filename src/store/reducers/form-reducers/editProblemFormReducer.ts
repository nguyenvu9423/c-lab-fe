import { Target } from './../target';
import { ProblemState } from './../data-holders/problemReducer';
import { combineReducers } from 'redux';
import { problemReducer } from '../data-holders';
import { createFilteredReducer } from '../utils';
import { TargetPredicates } from '../target';

export interface EditProblemFormState {
  data: {
    problem: ProblemState;
  };
}

export const editProblemFormReducer = createFilteredReducer(
  combineReducers<EditProblemFormState>({
    data: combineReducers({ problem: problemReducer }),
  }),
  TargetPredicates.equal(Target.EDIT_PROBLEM_FORM),
);
