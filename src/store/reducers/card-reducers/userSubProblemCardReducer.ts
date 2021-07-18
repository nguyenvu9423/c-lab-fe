import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { submissionsReducer, SubmissionsState } from '../data-holders';
import { createTargetChecker, Target } from '../target';

export interface UserProblemSubCardState {
  data: {
    submissions: SubmissionsState;
  };
}

export const userProblemSubCardReducer = filterActions(
  combineReducers<UserProblemSubCardState>({
    data: combineReducers({
      submissions: submissionsReducer,
    }),
  }),
  createTargetChecker(Target.USER_PROBLEM_SUB_CARD)
);
