import { fetchDetailedProblem } from './../../actions/problem';
import { createReducer } from '@reduxjs/toolkit';
import { DataHolderState } from './shared';
import { LoadingState } from '../../common';
import { resetState } from '../../actions';

export type DetailedProblemState = DataHolderState<
  Record<string, unknown>,
  { id: number }
>;

const initialState: DetailedProblemState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const detailedProblemReducer = createReducer<DetailedProblemState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchDetailedProblem.request, () => {
        return {
          loadingState: LoadingState.LOADING,
        };
      })
      .addCase(fetchDetailedProblem.response, (state, action) => {
        const { result: id } = action.payload;
        return {
          id,
          loadingState: LoadingState.LOADED,
        };
      })
      .addCase(fetchDetailedProblem.error, (state, action) => {
        const { error } = action.payload;
        return {
          loadingState: LoadingState.ERROR,
          error,
        };
      })
      .addCase(resetState, () => initialState);
  },
);
