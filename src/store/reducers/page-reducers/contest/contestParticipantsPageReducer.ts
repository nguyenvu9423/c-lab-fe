import { combineReducers } from 'redux';
import {
  userContestRegistrationsReducer,
  UserContestRegistrationsState,
} from '../../data-holders';
import { createFilteredReducer } from '../../utils';
import { Target, TargetPredicates } from '../../target';

export interface ContestParticipantsPageState {
  data: {
    registrations: UserContestRegistrationsState;
  };
}

export const contestParticipantsPageReducer = createFilteredReducer(
  combineReducers<ContestParticipantsPageState>({
    data: combineReducers({
      registrations: userContestRegistrationsReducer,
    }),
  }),
  TargetPredicates.equal(Target.ContestPageContents.PARTICIPANTS),
);
