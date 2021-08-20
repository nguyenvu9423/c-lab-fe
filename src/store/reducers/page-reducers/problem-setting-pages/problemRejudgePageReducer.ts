import { Target } from './../../target';
import {
  DetailedProblemState,
  detailedProblemReducer,
} from './../../data-holders/detailedProblemReducer';
import { combineReducers } from 'redux';
import { TargetPredicates } from '../../target';
import { createFilteredReducer } from '../../utils';

export interface ProblemRejudgeFormState {
  data: {
    detailedProblem: DetailedProblemState;
  };
}

export const problemRejudgeFormReducer = createFilteredReducer(
  combineReducers<ProblemRejudgeFormState>({
    data: combineReducers({
      detailedProblem: detailedProblemReducer,
    }),
  }),
  TargetPredicates.equal(Target.PROBLEM_REJUDGE_FORM)
);
