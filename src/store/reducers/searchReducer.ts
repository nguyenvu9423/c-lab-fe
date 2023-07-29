import { SearchResult } from '@/domains/search/SearchResult';
import { createReducer } from '@reduxjs/toolkit';
import { fetchSearch } from './../actions/search';
import { LoadingState } from '../common';
import { DataHolderState } from './data-holders/shared';

export type SearchState = DataHolderState<
  { searchString: string; requestId?: string },
  { results: SearchResult[]; searchString: string }
>;

const initialState: SearchState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const searchReducer = createReducer<SearchState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchSearch.request, (state, action) => {
        const { searchString, requestId } = action.payload;
        return {
          loadingState: LoadingState.LOADING,
          searchString,
          requestId,
        };
      })
      .addCase(fetchSearch.response, (state, action) => {
        const { requestId, results } = action.payload;
        if (
          state.loadingState === LoadingState.LOADING &&
          requestId === state.requestId
        ) {
          return {
            ...state,
            loadingState: LoadingState.LOADED,
            results,
          };
        }
        return state;
      })
      .addCase(fetchSearch.clear, () => {
        return initialState;
      })
      .addCase(fetchSearch.error, (state, action) => {
        const { requestId, error } = action.payload;
        if (
          state.loadingState === LoadingState.LOADING &&
          requestId === state.requestId
        ) {
          return { ...state, loadingState: LoadingState.ERROR, error };
        }
        return state;
      });
  },
);
