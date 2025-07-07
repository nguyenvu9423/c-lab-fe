import { combineReducers } from 'redux';
import {
  contestSubmissionReducer,
  ContestSubmissionsState,
} from '../../data-holders';
import { Target, TargetPredicates } from '../../target';
import { createFilteredReducer } from '../../utils/createFilteredReducer';

export interface PrincipalContestSubsState {
  data: {
    submissions: ContestSubmissionsState;
  };
}

export const principalContestSubsReducer = createFilteredReducer(
  combineReducers<PrincipalContestSubsState>({
    data: combineReducers({
      submissions: contestSubmissionReducer,
    }),
  }),
  TargetPredicates.equal(Target.ContestPageContents.PRINCIPAL_SUBMISSIONS),
);
