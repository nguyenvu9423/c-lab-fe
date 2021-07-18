import { DataHolderState } from './shared';
import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { fetchProblem } from '../../actions';
import { resetState } from '../../actions/state';

export type ProblemState = DataHolderState<
  Record<string, unknown>,
  { id: number }
>;

const initialState: ProblemState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

const problemReducer = createReducer<ProblemState>(initialState, (builder) => {
  builder
    .addCase(fetchProblem.request, () => {
      return {
        loadingState: LoadingState.LOADING,
      };
    })
    .addCase(fetchProblem.response, (state, action) => {
      const { result: id } = action.payload;
      return {
        id,
        loadingState: LoadingState.LOADED,
      };
    })
    .addCase(fetchProblem.error, (state, action) => {
      const { error } = action.payload;
      return {
        loadingState: LoadingState.ERROR,
        error,
      };
    })
    .addCase(resetState, () => initialState);
});

export { problemReducer };
