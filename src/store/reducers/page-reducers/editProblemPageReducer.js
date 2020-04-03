import { combineReducers } from 'redux';
import { problemReducer } from '../data-reducers/problem';
import { filterActions } from 'redux-ignore';
import { Target } from '../targets';

export const editProblemPageReducer = combineReducers({
  problem: filterActions(
    problemReducer,
    action => action.meta?.target === Target.PROBLEM_EDIT_PAGE
  )
});
