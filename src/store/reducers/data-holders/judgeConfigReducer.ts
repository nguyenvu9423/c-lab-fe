import { fetchJudgeConfig } from './../../actions/judge-config';
import { LoadingState } from './../../common';
import { DataHolderState } from './shared';
import { createReducer } from '@reduxjs/toolkit';

export type JudgeConfigState = DataHolderState<
  Record<string, unknown>,
  { result: number }
>;

const initialState: JudgeConfigState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const judgeConfigReducer = createReducer<JudgeConfigState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchJudgeConfig.request, () => ({
        loadingState: LoadingState.LOADING,
      }))
      .addCase(fetchJudgeConfig.response, (state, action) => {
        if (state.loadingState === LoadingState.LOADING) {
          const { result } = action.payload;
          return {
            ...state,
            loadingState: LoadingState.LOADED,
            result,
          };
        }
      })
      .addCase(fetchJudgeConfig.error, (state, action) => {
        if (state.loadingState === LoadingState.LOADING) {
          const { error } = action.payload;
          return {
            ...state,
            loadingState: LoadingState.ERROR,
            error,
          };
        }
      });
  }
);
