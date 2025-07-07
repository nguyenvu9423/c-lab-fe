import { createReducer } from '@reduxjs/toolkit';
import { DataHolderState } from './shared';
import { LoadingState } from '../../common';
import { fetchContestProblemRejudge } from '@/store/actions/contest/contest-problem-rejudge';

export type ContestProblemRejudgeState = DataHolderState<
  Record<string, unknown>,
  { result: number | null }
>;

const initialState: ContestProblemRejudgeState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const contestProblemRejudgeReducer =
  createReducer<ContestProblemRejudgeState>(initialState, (builder) => {
    builder
      .addCase(fetchContestProblemRejudge.request, () => ({
        loadingState: LoadingState.LOADING,
      }))
      .addCase(fetchContestProblemRejudge.response, (state, action) => {
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
      .addCase(fetchContestProblemRejudge.error, (state, action) => {
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
  });
