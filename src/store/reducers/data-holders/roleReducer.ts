import { createReducer } from '@reduxjs/toolkit';
import { Role } from './../../../domains/role/Role';
import { DataHolderState } from './shared';
import { LoadingState } from '../../common';
import { fetchRole } from '../../actions';
import { NormalizedEntities } from '../../../entity-schemas/types';

export type RoleState = DataHolderState<
  Record<string, unknown>,
  { result: number; entities: NormalizedEntities<Role> }
>;

const initialState: RoleState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const roleReducer = createReducer<RoleState>(initialState, (builder) => {
  builder
    .addCase(fetchRole.request, () => ({
      loadingState: LoadingState.LOADING,
    }))
    .addCase(fetchRole.response, (state, action) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { result, entities } = action.payload;
        return {
          loadingState: LoadingState.LOADED,
          result,
          entities,
        };
      }
      return state;
    })
    .addCase(fetchRole.error, (state, action) => {
      if (state.loadingState === LoadingState.ERROR) {
        const { error } = action.payload;
        return {
          loadingState: LoadingState.ERROR,
          error,
        };
      }
      return state;
    });
});
