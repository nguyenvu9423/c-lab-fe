import { LoadingState } from '../../common';
import { problemReducer } from '../data-reducers';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { Target } from '../targets';

export const problemDetailsPageReducer = combineReducers({
  data: filterActions(
    combineReducers({
      problem: problemReducer
    }),
    action => action.meta?.target === Target.PROBLEM_DETAILS_PAGE
  )
});
