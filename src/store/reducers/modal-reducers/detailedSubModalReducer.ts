import {
  detailedJudgeReducer,
  DetailedJudgeState,
} from './../data-holders/detailedJudgeReducer';
import { filterActions } from 'redux-ignore';
import { combineReducers } from 'redux';
import { createTargetChecker, Target } from '../target';
import { detailedSubReducer, DetailedSubState } from '../data-holders';

export interface DetailedSubModalState {
  data: {
    detailedSub: DetailedSubState;
    detailedJudge: DetailedJudgeState;
  };
}

export const detailedSubModalReducer = filterActions(
  combineReducers<DetailedSubModalState>({
    data: combineReducers({
      detailedSub: detailedSubReducer,
      detailedJudge: detailedJudgeReducer,
    }),
  }),
  createTargetChecker(Target.DETAILED_SUB_MODAL)
);
