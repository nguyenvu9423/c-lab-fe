import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';
import { problemsReducer, ProblemsState } from '../data-holders';
import { createTargetChecker, Target } from '../target';

export interface ProblemsPageState {
  data: {
    problems: ProblemsState;
  };
}

export const problemsPageReducer = filterActions(
  combineReducers<ProblemsPageState>({
    data: combineReducers({
      problems: problemsReducer,
    }),
  }),
  createTargetChecker(Target.PROBLEMS_PAGE)
);
