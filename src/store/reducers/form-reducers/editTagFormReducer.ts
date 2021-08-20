import { TagState } from './../data-holders/tagReducer';
import { combineReducers } from 'redux';
import { tagReducer } from '../data-holders';

export interface EditTagFormState {
  data: {
    tag: TagState;
  };
}

export const editTagFormReducer = combineReducers<EditTagFormState>({
  data: combineReducers({
    tag: tagReducer,
  }),
});
