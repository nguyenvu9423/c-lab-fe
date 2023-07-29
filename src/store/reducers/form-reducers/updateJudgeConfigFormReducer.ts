import { Target } from './../target';
import { combineReducers } from 'redux';
import { TargetPredicates } from '../target';
import {
  detailedProblemReducer,
  DetailedProblemState,
} from './../data-holders/detailedProblemReducer';
import { createFilteredReducer } from '../utils';

export interface UpdateJudgeConfigFormState {
  data: {
    detailedProblem: DetailedProblemState;
  };
}

export const updateJudgeConfigFormReducer = createFilteredReducer(
  combineReducers<UpdateJudgeConfigFormState>({
    data: combineReducers({ detailedProblem: detailedProblemReducer }),
  }),
  TargetPredicates.equal(Target.UPDATE_JUDGE_CONFIG_FORM),
);
