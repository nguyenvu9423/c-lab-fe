import { fetchTag } from './../../actions/tag';
import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { DataHolderState } from './shared';

export type TagState = DataHolderState<
  Record<string, unknown>,
  {
    result: number;
  }
>;

const initialState: TagState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const tagReducer = createReducer<TagState>(initialState, (builder) => {
  builder
    .addCase(fetchTag.request, () => ({
      loadingState: LoadingState.LOADING,
    }))
    .addCase(fetchTag.response, (state, { payload }) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { result } = payload;
        return {
          ...state,
          loadingState: LoadingState.LOADED,
          result,
        };
      }
      return state;
    })
    .addCase(fetchTag.error, (state, { payload }) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { error } = payload;
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error,
        };
      }
      return state;
    });
});
