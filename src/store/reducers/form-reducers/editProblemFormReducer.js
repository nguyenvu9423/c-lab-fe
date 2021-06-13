import { combineReducers } from 'redux';
import { problemReducer } from '../data-reducers';

export const editProblemFormReducer = combineReducers({
  data: combineReducers({ problem: problemReducer }),
});
