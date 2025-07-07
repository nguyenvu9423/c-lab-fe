import { combineReducers } from 'redux';
import { createFilteredReducer } from '../utils';
import { ContestState, contestReducer } from '../data-holders/contestReducer';
import { Target, TargetPredicates } from '../target';
import {
  userContestRegistrationReducer,
  UserContestRegistrationState,
} from '../data-holders';

export interface ContestPageState {
  data: {
    contest: ContestState;
    principalRegistration: UserContestRegistrationState;
  };
}

export const contestPageReducer = createFilteredReducer(
  combineReducers<ContestPageState>({
    data: combineReducers({
      contest: contestReducer,
      principalRegistration: userContestRegistrationReducer,
    }),
  }),
  TargetPredicates.equal(Target.CONTEST_PAGE),
);
