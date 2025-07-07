import { combineReducers } from 'redux';
import {
  contestSubmissionReducer,
  ContestSubmissionsState,
} from '../../data-holders';
import { Target, TargetPredicates } from '../../target';
import { createFilteredReducer } from '../../utils/createFilteredReducer';

export interface ContestSubmissionsPageState {
  data: {
    submissions: ContestSubmissionsState;
  };
}

export const contestSubmissionsPageReducer = createFilteredReducer(
  combineReducers<ContestSubmissionsPageState>({
    data: combineReducers({
      submissions: contestSubmissionReducer,
    }),
  }),
  TargetPredicates.equal(Target.ContestPageContents.SUBMISSIONS),
);
