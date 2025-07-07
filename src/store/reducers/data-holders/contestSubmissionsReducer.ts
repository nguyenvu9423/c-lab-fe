import { Pageable } from '@/utils/Pageable';
import { DataHolderState } from './shared';
import { BaseException } from '@/shared/exceptions';
import { LoadingState } from '@/store/common';
import { createReducer } from '@reduxjs/toolkit';
import { resetState } from '@/store/actions';
import { fetchContestSubmissions } from '@/store/actions';

export type ContestSubmissionsState = DataHolderState<
  { pageable: Pageable },
  { results: number[]; pageable: Pageable; totalPages: number },
  { error: BaseException; pageable: Pageable }
>;

const initialState: ContestSubmissionsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const contestSubmissionReducer = createReducer<ContestSubmissionsState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchContestSubmissions.request, (state, action) => {
        const { payload } = action;
        return {
          pageable: payload.pageable,
          loadingState: LoadingState.LOADING,
        };
      })
      .addCase(fetchContestSubmissions.response, (state, action) => {
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
      .addCase(fetchContestSubmissions.error, (state, action) => {
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
