import { createReducer } from '@reduxjs/toolkit';
import { fetchProblemRejudge } from './../../actions/problem-rejudge';
import { DataHolderState } from './shared';
import { LoadingState } from '../../common';

export type ProblemRejudgeState = DataHolderState<
  Record<string, unknown>,
  { result: number }
>;

const initialState: ProblemRejudgeState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const problemRejudgeReducer = createReducer<ProblemRejudgeState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchProblemRejudge.request, () => ({
        loadingState: LoadingState.LOADING,
      }))
      .addCase(fetchProblemRejudge.response, (state, action) => {
        const { result } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            loadingState: LoadingState.LOADED,
            result,
          };
        }
        return state;
      })
      .addCase(fetchProblemRejudge.error, (state, action) => {
        const { error } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            loadingState: LoadingState.ERROR,
            error,
          };
        }
        return state;
      });
  },
);
