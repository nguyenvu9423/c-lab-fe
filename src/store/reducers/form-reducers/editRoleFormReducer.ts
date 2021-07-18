import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { roleReducer, RoleState } from '../data-holders';
import { createTargetChecker, Target } from '../target';

export interface EditRoleFormState {
  data: {
    role: RoleState;
  };
}

export const editRoleFormReducer = filterActions(
  combineReducers<EditRoleFormState>({
    data: combineReducers({
      role: roleReducer,
    }),
  }),
  createTargetChecker(Target.EDIT_ROLE_FORM)
);
