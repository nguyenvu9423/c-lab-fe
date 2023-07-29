import { combineReducers } from 'redux';
import { submissionsReducer, SubmissionsState } from '../data-holders';
import { Target, TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils/createFilteredReducer';

export interface PrincipalProblemSubsCardState {
  data: {
    submissions: SubmissionsState;
  };
}

export const principalProblemSubsCardReducer = createFilteredReducer(
  combineReducers<PrincipalProblemSubsCardState>({
    data: combineReducers({
      submissions: submissionsReducer,
    }),
  }),
  TargetPredicates.equal(Target.PRINCIPAL_PROBLEM_SUBS_CARD),
);
