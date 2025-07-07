import { combineReducers } from 'redux';
import { createFilteredReducer } from '../utils';
import { ContestState, contestReducer } from '../data-holders/contestReducer';
import { Target, TargetPredicates } from '../target';

export interface ContestRejudgeFormState {
  data: {
    contest: ContestState;
  };
}

export const contestRejudgeFormReducer = createFilteredReducer(
  combineReducers<ContestRejudgeFormState>({
    data: combineReducers({
      contest: contestReducer,
    }),
  }),
  TargetPredicates.equal(Target.CONTEST_REJUDGE_FORM),
);
