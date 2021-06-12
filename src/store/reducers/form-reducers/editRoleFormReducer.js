import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { roleReducer } from '../data-reducers';
import { createTargetChecker, Target } from '../target';

export const editRoleFormReducer = filterActions(
  combineReducers({
    data: combineReducers({
      role: roleReducer
    })
  }),
  createTargetChecker(Target.EDIT_ROLE_FORM)
);
