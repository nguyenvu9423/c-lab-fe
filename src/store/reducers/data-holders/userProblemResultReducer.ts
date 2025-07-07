import { DataHolderState } from './shared';
import { LoadingState } from '@/store/common';
import { createReducer } from '@reduxjs/toolkit';
import { fetchUserProblemResults, resetState } from '@/store/actions';

export type UserProblemResultsState = DataHolderState<
  {
    problemIds: number[];

    userIds: number[];
  },
  {
    result: number[];
  }
>;

const initialState: UserProblemResultsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const userProblemResultsReducer = createReducer<UserProblemResultsState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchUserProblemResults.request, (state, action) => {
        const { problemIds, userIds, requestId } = action.payload;
        return {
          loadingState: LoadingState.LOADING,
          problemIds,
          userIds,
          requestId,
        };
      })
      .addCase(fetchUserProblemResults.response, (state, action) => {
        const { result } = action.payload;
        return {
          ...state,
          loadingState: LoadingState.LOADED,
          result,
        };
      })
      .addCase(fetchUserProblemResults.error, (state, action) => {
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
      .addCase(resetState, () => initialState);
  },
);
