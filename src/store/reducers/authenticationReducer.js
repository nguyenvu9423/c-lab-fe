import { createTargetChecker, Target } from './target';
import { filterActions } from 'redux-ignore';
import { combineReducers } from 'redux';
import { userReducer } from './data-reducers/userReducer';

export const authenticationReducer = filterActions(
  combineReducers({
    user: userReducer
  }),
  createTargetChecker(Target.AUTHENTICATION)
);
