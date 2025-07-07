import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '@/store/common';
import { DataHolderState } from './shared';
import { fetchUserContestRegistrations, resetState } from '@/store/actions';
import { Pageable } from '@/utils/Pageable';

export type UserContestRegistrationsState = DataHolderState<
  { pageable: Pageable },
  { result: number[]; pageable: Pageable; totalPages: number }
>;

const initialState: UserContestRegistrationsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const userContestRegistrationsReducer =
  createReducer<UserContestRegistrationsState>(initialState, (builder) =>
    builder
      .addCase(fetchUserContestRegistrations.request, (_state, { payload }) => {
        const { pageable } = payload;
        return {
          loadingState: LoadingState.LOADING,
          pageable,
        };
      })
      .addCase(fetchUserContestRegistrations.response, (state, action) => {
        const { result, totalPages } = action.payload;

        if (state.loadingState !== LoadingState.LOADING) {
          return state;
        }

        return {
          ...state,
          result,
          totalPages,
          loadingState: LoadingState.LOADED,
        };
      })
      .addCase(resetState, () => initialState),
  );
