import { combineReducers } from 'redux';
import { detailedSubmissionReducer } from '../data-reducers';

export const detailedSubmissionModalReducer = combineReducers({
  detailedSubmission: detailedSubmissionReducer
});
