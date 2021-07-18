import { ProblemState } from './../data-holders/problemReducer';
import { combineReducers } from 'redux';
import { problemReducer } from '../data-holders';

export interface EditProblemFormState {
  data: {
    problem: ProblemState;
  };
}

export const editProblemFormReducer = combineReducers<EditProblemFormState>({
  data: combineReducers({ problem: problemReducer }),
});
