import { combineReducers } from 'redux';
import { createFilteredReducer } from '../utils';
import { ContestState, contestReducer } from '../data-holders/contestReducer';
import { Target, TargetPredicates } from '../target';

export interface EditContestJudgeConfigFormState {
  data: {
    contest: ContestState;
  };
}

export const editContestJudgeConfigFormReducer = createFilteredReducer(
  combineReducers<EditContestJudgeConfigFormState>({
    data: combineReducers({
      contest: contestReducer,
    }),
  }),
  TargetPredicates.equal(Target.EDIT_CONTEST_JUDGE_CONFIG_FORM),
);
