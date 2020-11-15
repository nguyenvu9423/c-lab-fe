import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { tagReducer } from '../data-reducers';
import { createTargetChecker, Target } from '../target';

const isWithTarget = createTargetChecker(Target.EDIT_TAG_FORM);

export const editTagFormReducer = filterActions(
  combineReducers({
    data: combineReducers({
      tag: tagReducer
    })
  }),
  isWithTarget
);
