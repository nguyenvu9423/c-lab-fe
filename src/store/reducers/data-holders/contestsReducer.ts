import { Pageable } from '@/utils/Pageable';
import { DataHolderState } from './shared';
import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '@/store/common';
import { fetchContests, resetState } from '@/store/actions';

export type ContestsState = DataHolderState<
  { pageable?: Pageable; query?: string },
  { result: number[]; pageable?: Pageable; totalPages: number; query?: string },
  { pageable?: Pageable; query?: string }
>;

const initialState: ContestsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const contestsReducer = createReducer<ContestsState>(
  initialState,
  (builder) =>
    builder
      .addCase(fetchContests.request, (state, action) => {
        const { pageable, query } = action.payload;
        return {
          loadingState: LoadingState.LOADING,
          pageable,
          query,
        };
      })
      .addCase(fetchContests.response, (state, action) => {
        const { result, totalPages } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            result,
            loadingState: LoadingState.LOADED,
            totalPages,
          };
        }
        return state;
      })
      .addCase(fetchContests.error, (state, action) => {
        const { error } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            loadingState: LoadingState.ERROR,
            error,
          };
        }
        return state;
      })
      .addCase(resetState, () => initialState),
);
