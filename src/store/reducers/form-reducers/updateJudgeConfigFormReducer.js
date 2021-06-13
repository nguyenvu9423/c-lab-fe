import { combineReducers } from 'redux';
import { problemReducer } from '../data-reducers/problemReducer';

export const updateJudgeConfigFormReducer = combineReducers({
  data: combineReducers({ problem: problemReducer }),
});
