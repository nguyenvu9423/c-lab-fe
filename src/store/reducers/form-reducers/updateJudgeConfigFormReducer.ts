import { ProblemState } from './../data-holders/problemReducer';
import { combineReducers } from 'redux';
import { problemReducer } from './../data-holders';

export interface UpdateJudgeConfigFormState {
  data: {
    problem: ProblemState;
  };
}

export const updateJudgeConfigFormReducer =
  combineReducers<UpdateJudgeConfigFormState>({
    data: combineReducers({ problem: problemReducer }),
  });
