import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { DataHolderState } from './shared';
import { fetchDetailedJudge } from '../../actions';

export type DetailedJudgeState = DataHolderState<
  Record<string, unknown>,
  { result: number }
>;

const initialState: DetailedJudgeState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const detailedJudgeReducer = createReducer<DetailedJudgeState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchDetailedJudge.request, () => ({
        loadingState: LoadingState.LOADING,
      }))
      .addCase(fetchDetailedJudge.response, (state, action) => {
        const { result } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            result,
            loadingState: LoadingState.LOADED,
          };
        }
        return state;
      })
      .addCase(fetchDetailedJudge.error, (state, action) => ({
        error: action.payload.error,
        loadingState: LoadingState.ERROR,
      }));
  }
);
