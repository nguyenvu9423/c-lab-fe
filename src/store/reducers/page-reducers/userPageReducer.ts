import { Target } from './../target';
import { combineReducers } from 'redux';
import {
  submissionsReducer,
  SubmissionsState,
  userReducer,
} from '../data-holders';
import { UserState } from '../data-holders';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface UserPageState {
  data: {
    user: UserState;
    submissions: SubmissionsState;
  };
}

export const userPageReducer = createFilteredReducer(
  combineReducers<UserPageState>({
    data: combineReducers({
      user: userReducer,
      submissions: submissionsReducer,
    }),
  }),
  TargetPredicates.equal(Target.USER_PAGE),
);
