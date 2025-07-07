import { combineReducers } from 'redux';
import {
  ContestsState,
  contestsReducer,
  userContestRegistrationsReducer,
} from '../data-holders';
import { createFilteredReducer } from '../utils';
import { Target, TargetPredicates } from '../target';
import { UserContestRegistrationsState } from '../data-holders';

export interface ContestsPageState {
  data: {
    upcomingContests: ContestsState;
    upcomingContestRegistrations: UserContestRegistrationsState;
    finishedContests: ContestsState;
  };
}

export const contestsPageReducer = combineReducers<ContestsPageState>({
  data: combineReducers({
    upcomingContests: createFilteredReducer(
      contestsReducer,
      TargetPredicates.equal(Target.ContestsPage.UPCOMING_CONTESTS),
    ),
    upcomingContestRegistrations: createFilteredReducer(
      userContestRegistrationsReducer,
      TargetPredicates.equal(Target.ContestsPage.UPCOMING_CONTESTS),
    ),
    finishedContests: createFilteredReducer(
      contestsReducer,
      TargetPredicates.equal(Target.ContestsPage.FINISHED_CONTESTS),
    ),
  }),
});
