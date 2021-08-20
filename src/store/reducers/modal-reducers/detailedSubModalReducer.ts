import {
  detailedJudgeReducer,
  DetailedJudgeState,
} from './../data-holders/detailedJudgeReducer';
import { combineReducers } from 'redux';
import { detailedSubReducer, DetailedSubState } from '../data-holders';

export interface DetailedSubModalState {
  data: {
    detailedSub: DetailedSubState;
    detailedJudge: DetailedJudgeState;
  };
}

export const detailedSubModalReducer = combineReducers<DetailedSubModalState>({
  data: combineReducers({
    detailedSub: detailedSubReducer,
    detailedJudge: detailedJudgeReducer,
  }),
});
