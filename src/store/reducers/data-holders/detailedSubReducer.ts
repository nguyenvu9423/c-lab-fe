import { fetchDetailedSub } from './../../actions/submission';
import { createReducer } from '@reduxjs/toolkit';
import { DataHolderState } from './shared';
import { LoadingState } from '../../common';

export type DetailedSubState = DataHolderState<
  Record<string, unknown>,
  { id: number }
>;

const initialState: DetailedSubState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

const detailedSubReducer = createReducer<DetailedSubState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchDetailedSub.request, () => ({
        loadingState: LoadingState.LOADING,
      }))
      .addCase(fetchDetailedSub.response, (state, action) => {
        const { result: id } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            id,
            loadingState: LoadingState.LOADED,
          };
        }
        return state;
      })
      .addCase(fetchDetailedSub.error, (state, action) => ({
        error: action.payload.error,
        loadingState: LoadingState.ERROR,
      }));
  },
);

export { detailedSubReducer };
