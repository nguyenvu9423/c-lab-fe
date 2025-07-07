import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '@/store/common';
import { DataHolderState } from './shared';
import { fetchUserContestRegistration, resetState } from '@/store/actions';

export type UserContestRegistrationState = DataHolderState<
  { userId: number; contestId: number },
  { id: number | null }
>;

const initialState: UserContestRegistrationState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const userContestRegistrationReducer =
  createReducer<UserContestRegistrationState>(initialState, (builder) =>
    builder
      .addCase(fetchUserContestRegistration.request, (_state, { payload }) => {
        const { userId, contestId } = payload;
        return { loadingState: LoadingState.LOADING, userId, contestId };
      })
      .addCase(fetchUserContestRegistration.response, (state, action) => {
        const { result } = action.payload;

        if (state.loadingState !== LoadingState.LOADING) {
          return state;
        }

        return {
          ...state,
          id: result,
          loadingState: LoadingState.LOADED,
        };
      })
      .addCase(resetState, () => initialState),
  );
