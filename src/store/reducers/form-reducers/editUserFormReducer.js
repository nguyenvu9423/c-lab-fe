import { filterActions } from 'redux-ignore';
import { createTargetChecker, Target } from '../target';
import { combineReducers } from 'redux';
import { userReducer } from '../data-reducers/userReducer';

export const editUserFormReducer = filterActions(
  combineReducers({
    data: combineReducers({
      user: userReducer,
    }),
  }),
  createTargetChecker(Target.EDIT_USER_FORM)
);
