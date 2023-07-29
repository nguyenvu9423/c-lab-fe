import { Target } from './../target';
import { combineReducers } from 'redux';
import { UserState } from './../data-holders/userReducer';
import { userReducer } from '../data-holders/userReducer';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface EditUserFormState {
  data: {
    user: UserState;
  };
}

export const editUserFormReducer = createFilteredReducer(
  combineReducers<EditUserFormState>({
    data: combineReducers({
      user: userReducer,
    }),
  }),
  TargetPredicates.equal(Target.EDIT_USER_FORM),
);
