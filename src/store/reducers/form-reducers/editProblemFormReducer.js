import { combineReducers } from 'redux';
import { judgeConfigsReducer, problemReducer } from '../data-reducers';

export const editProblemFormReducer = combineReducers({
  data: combineReducers({
    judgeConfigs: judgeConfigsReducer,
    problem: problemReducer
  })
});
