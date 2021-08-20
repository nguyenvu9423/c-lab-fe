import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { fetchUser, resetState } from '../../actions';
import { DataHolderState } from './shared';

export type UserState = DataHolderState<
  Record<string, unknown>,
  { result: number }
>;

const initialState: UserState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const userReducer = createReducer<UserState>(initialState, (builder) => {
  builder
    .addCase(fetchUser.request, () => ({
      loadingState: LoadingState.LOADING,
    }))
    .addCase(fetchUser.response, (state, action) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { result } = action.payload;
        return {
          ...state,
          loadingState: LoadingState.LOADED,
          result,
        };
      }
    })
    .addCase(fetchUser.error, (state, action) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { error } = action.payload;
        return { ...state, loadingState: LoadingState.ERROR, error };
      }
      return state;
    })
    .addCase(resetState, () => initialState);
});
