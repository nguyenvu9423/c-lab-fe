import { combineReducers } from 'redux';
import { submissionsReducer, SubmissionsState } from './data-holders';
import { Target, TargetPredicates } from './target';
import { createFilteredReducer } from './utils/createFilteredReducer';

export interface PrincipalProblemSubsState {
  data: {
    submissions: SubmissionsState;
  };
}

export const principalProblemSubsReducer = createFilteredReducer(
  combineReducers<PrincipalProblemSubsState>({
    data: combineReducers({
      submissions: submissionsReducer,
    }),
  }),
  TargetPredicates.equal(Target.ProblemPageContents.PRINCIPAL_SUBMISSIONS)
);
