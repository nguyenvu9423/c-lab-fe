import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { Target, createTargetChecker } from '../target';
import { userReducer } from '../data-reducers';

const isWithTarget = createTargetChecker(Target.USER_PAGE);

export const userPageReducer = filterActions(
  combineReducers({
    data: combineReducers({
      user: userReducer
    })
  }),
  isWithTarget
);
