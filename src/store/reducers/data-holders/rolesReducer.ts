import { EntityId, createReducer } from '@reduxjs/toolkit';
import { DataHolderState } from './shared';
import { Pageable } from '../../../utility';
import { LoadingState } from '../../common';
import { fetchRoles } from '../../actions';

export type RolesState = DataHolderState<
  { pageable: Pageable },
  {
    result: EntityId[];
    pageable: Pageable;
    totalPages: number;
  },
  {
    pageable: Pageable;
  }
>;

const initialState: RolesState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const rolesReducer = createReducer<RolesState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchRoles.request, (state, { payload }) => {
        const { pageable } = payload;
        return {
          loadingState: LoadingState.LOADING,
          pageable,
        };
      })
      .addCase(fetchRoles.response, (state, { payload }) => {
        const { result, totalPages } = payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            loadingState: LoadingState.LOADED,
            result,
            totalPages,
          };
        }
        return state;
      })
      .addCase(fetchRoles.error, (state, { payload }) => {
        const { error } = payload;
        if (state.loadingState === LoadingState.LOADING) {
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
