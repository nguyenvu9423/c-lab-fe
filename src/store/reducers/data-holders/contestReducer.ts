import { createReducer } from '@reduxjs/toolkit';
import { DataHolderState } from './shared';
import { LoadingState } from '@/store/common';
import { fetchContest, resetState } from '@/store/actions';

export type ContestState = DataHolderState<
  Record<string, unknown>,
  { id: number }
>;

const initialState: ContestState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const contestReducer = createReducer<ContestState>(
  initialState,
  (builder) =>
    builder
      .addCase(fetchContest.request, () => {
        return { loadingState: LoadingState.LOADING };
      })
      .addCase(fetchContest.response, (state, action) => {
        const { result: id } = action.payload;
        return {
          id,
          loadingState: LoadingState.LOADED,
        };
      })
      .addCase(fetchContest.error, (state, action) => {
        const { error } = action.payload;
        return {
          loadingState: LoadingState.ERROR,
          error,
        };
      })
      .addCase(resetState, () => initialState),
);
