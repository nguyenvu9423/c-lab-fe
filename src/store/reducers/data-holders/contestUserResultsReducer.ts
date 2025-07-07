import { Pageable } from '@/utils/Pageable';
import { DataHolderState } from './shared';
import { BaseException } from '@/shared/exceptions';
import { LoadingState } from '@/store/common';
import { createReducer } from '@reduxjs/toolkit';
import { fetchContestUserResults, resetState } from '@/store/actions';

export type ContestUserResultsState = DataHolderState<
  { pageable: Pageable },
  { results: number[]; pageable: Pageable; totalPages: number },
  { error: BaseException; pageable: Pageable }
>;

const initialState: ContestUserResultsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const contestUserResultReducer = createReducer<ContestUserResultsState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchContestUserResults.request, (state, action) => {
        const { payload } = action;
        return {
          pageable: payload.pageable,
          loadingState: LoadingState.LOADING,
        };
      })
      .addCase(fetchContestUserResults.response, (state, action) => {
        const { payload } = action;
        if (state.loadingState !== LoadingState.LOADING) {
          return;
        }
        return {
          ...state,
          loadingState: LoadingState.LOADED,
          results: payload.result,
          totalPages: payload.totalPages,
        };
      })
      .addCase(fetchContestUserResults.error, (state, action) => {
        if (state.loadingState !== LoadingState.LOADING) {
          return state;
        }
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error: action.payload.error,
        };
      })
      .addCase(resetState, () => initialState);
  },
);
