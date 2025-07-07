import { combineReducers } from 'redux';
import { Target } from './../target';
import {
  problemsReducer,
  ProblemsState,
  userProblemResultsReducer,
  UserProblemResultsState,
} from '../data-holders';
import { TargetPredicates } from '../target';
import { createFilteredReducer } from '../utils';

export interface ProblemsPageState {
  data: {
    problems: ProblemsState;

    userProblemResults: UserProblemResultsState;
  };
}

export const problemsPageReducer = createFilteredReducer(
  combineReducers<ProblemsPageState>({
    data: combineReducers({
      problems: problemsReducer,

      userProblemResults: userProblemResultsReducer,
    }),
  }),
  TargetPredicates.equal(Target.PROBLEMS_PAGE),
);
