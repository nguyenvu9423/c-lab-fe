import { combineReducers } from 'redux';
import { createFilteredReducer } from '../utils';
import { Target, TargetPredicates } from '../target';
import {
  contestProblemRejudgeReducer,
  ContestProblemRejudgeState,
} from '../data-holders';

export interface ContestProblemRejudgeFormState {
  data: {
    latestRejudge: ContestProblemRejudgeState;
  };
}

export const contestProblemRejudgeFormReducer = createFilteredReducer(
  combineReducers<ContestProblemRejudgeFormState>({
    data: combineReducers({
      latestRejudge: contestProblemRejudgeReducer,
    }),
  }),
  TargetPredicates.equal(Target.CONTEST_PROBLEM_REJUDGE_FORM),
);
