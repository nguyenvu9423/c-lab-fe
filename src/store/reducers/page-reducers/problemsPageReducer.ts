import { combineReducers } from 'redux';
import { Target } from './../target';
import { problemsReducer, ProblemsState } from '../data-holders';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface ProblemsPageState {
  data: {
    problems: ProblemsState;
  };
}

export const problemsPageReducer = createFilteredReducer(
  combineReducers<ProblemsPageState>({
    data: combineReducers({
      problems: problemsReducer,
    }),
  }),
  TargetPredicates.equal(Target.PROBLEMS_PAGE)
);
