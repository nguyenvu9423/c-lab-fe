import { combineReducers } from 'redux';
import { createFilteredReducer } from '../utils';
import { ContestState, contestReducer } from '../data-holders/contestReducer';
import { Target, TargetPredicates } from '../target';

export interface EditContestFormState {
  data: {
    contest: ContestState;
  };
}

export const editContestFormReducer = createFilteredReducer(
  combineReducers<EditContestFormState>({
    data: combineReducers({
      contest: contestReducer,
    }),
  }),
  TargetPredicates.equal(Target.EDIT_CONTEST_FORM),
);
