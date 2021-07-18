import { TagState } from './../data-holders/tagReducer';
import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { tagReducer } from '../data-holders';
import { createTargetChecker, Target } from '../target';

export interface EditTagFormState {
  data: {
    tag: TagState;
  };
}

export const editTagFormReducer = filterActions(
  combineReducers<EditTagFormState>({
    data: combineReducers({
      tag: tagReducer,
    }),
  }),
  createTargetChecker(Target.EDIT_TAG_FORM)
);
