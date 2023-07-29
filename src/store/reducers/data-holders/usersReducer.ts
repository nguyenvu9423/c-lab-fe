import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { fetchUsers, resetState } from '../../actions';
import { DataHolderState } from './shared';
import { Pageable } from '../../../utils';

export type UsersState = DataHolderState<
  { pageable: Pageable; query?: string },
  { result: number[]; pageable: Pageable; totalPages: number; query?: string },
  { pageable: Pageable; query?: string }
>;

const initialState: UsersState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const usersReducer = createReducer<UsersState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchUsers.request, (state, action) => {
        const { pageable, query } = action.payload;
        return {
          loadingState: LoadingState.LOADING,
          pageable,
          query,
        };
      })
      .addCase(fetchUsers.response, (state, action) => {
        if (state.loadingState === LoadingState.LOADING) {
          const { result, totalPages } = action.payload;
          return {
            ...state,
            loadingState: LoadingState.LOADED,
            result,
            totalPages,
          };
        }
        return state;
      })
      .addCase(fetchUsers.error, (state, action) => {
        if (state.loadingState === LoadingState.LOADING) {
          const { error } = action.payload;
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
