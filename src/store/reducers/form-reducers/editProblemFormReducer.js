import { combineReducers } from 'redux';
import { testPackagesReducer } from '../data-reducers';

export const editProblemFormReducer = combineReducers({
  testPackages: testPackagesReducer
});
