import { Target } from './../target';
import { combineReducers } from 'redux';
import { userReducer } from '../data-holders';
import { UserState } from '../data-holders';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface UserPageState {
  data: {
    user: UserState;
  };
}

export const userPageReducer = createFilteredReducer(
  combineReducers<UserPageState>({
    data: combineReducers({
      user: userReducer,
    }),
  }),
  TargetPredicates.equal(Target.USER_PAGE)
);
