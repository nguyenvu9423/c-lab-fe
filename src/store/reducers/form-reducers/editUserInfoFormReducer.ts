import { Target } from './../target';
import { combineReducers } from 'redux';
import { userReducer } from './../data-holders/userReducer';
import { UserState } from '../data-holders';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface EditUserInfoFormState {
  data: {
    user: UserState;
  };
}

export const editUserInfoFormReducer = createFilteredReducer(
  combineReducers<EditUserInfoFormState>({
    data: combineReducers({
      user: userReducer,
    }),
  }),
  TargetPredicates.equal(Target.EDIT_USER_INFO_FORM)
);
