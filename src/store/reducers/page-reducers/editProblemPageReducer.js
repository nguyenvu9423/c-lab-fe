import { combineReducers } from 'redux';
import { problemReducer } from '../data-holders';
import { filterActions } from 'redux-ignore';
import { Target } from '../target';

export const editProblemPageReducer = combineReducers({
  problem: filterActions(
    problemReducer,
    (action) => action.meta?.target === Target.PROBLEM_EDIT_PAGE
  ),
});
