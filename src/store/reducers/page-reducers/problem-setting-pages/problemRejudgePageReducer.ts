import {
  DetailedProblemState,
  detailedProblemReducer,
} from './../../data-holders/detailedProblemReducer';
import { combineReducers } from 'redux';

export interface ProblemRejudgePageState {
  data: {
    detailedProblem: DetailedProblemState;
  };
}

export const problemRejudgePageReducer =
  combineReducers<ProblemRejudgePageState>({
    data: combineReducers({
      detailedProblem: detailedProblemReducer,
    }),
  });
