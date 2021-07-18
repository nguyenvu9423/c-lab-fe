import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { fetchUsers } from '../../actions';
import { DataHolderState } from './shared';
import { Pageable } from '../../../utility';

export type UsersState = DataHolderState<
  { pageable: Pageable; filters?: any[] },
  { result: number[]; pageable: Pageable; totalPages: number },
  { pageable: Pageable }
>;

const initialState: UsersState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const usersReducer = createReducer<UsersState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchUsers.request, (state, action) => {
        const { pageable, filters } = action.payload;
        return {
          loadingState: LoadingState.LOADING,
          pageable,
          filters,
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
      });
  }
);
