import { combineReducers } from 'redux';
import { roleReducer, RoleState } from '../data-holders';

export interface EditRoleFormState {
  data: {
    role: RoleState;
  };
}

export const editRoleFormReducer = combineReducers<EditRoleFormState>({
  data: combineReducers({
    role: roleReducer,
  }),
});
