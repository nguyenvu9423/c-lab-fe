import { problemsReducer } from '../data-reducers';
import { combineReducers } from 'redux';

const problemsPageReducer = combineReducers({
  problems: problemsReducer
});

export { problemsPageReducer };
