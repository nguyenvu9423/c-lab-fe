import { combineReducers } from 'redux';
import {
  ContestUserResultsState,
  contestUserResultReducer,
} from '../../data-holders';
import { createFilteredReducer } from '../../utils';
import { Target, TargetPredicates } from '../../target';

export interface ContestScoreboardPageState {
  data: {
    userResults: ContestUserResultsState;
  };
}

export const contestScoreboardPageReducer = createFilteredReducer(
  combineReducers<ContestScoreboardPageState>({
    data: combineReducers({
      userResults: contestUserResultReducer,
    }),
  }),
  TargetPredicates.equal(Target.ContestPageContents.SCOREBOARD),
);
