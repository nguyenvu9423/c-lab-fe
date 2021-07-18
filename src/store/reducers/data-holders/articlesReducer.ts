import { createReducer } from '@reduxjs/toolkit';
import { Pageable } from './../../../utility/Pageable';
import { DataHolderState } from './shared';
import { LoadingState } from '../../common';
import { fetchArticles } from '../../actions/article';

export type ArticlesState = DataHolderState<
  { pageable: Pageable; query?: string },
  { result: number[]; pageable: Pageable; totalPages: number; query?: string },
  { pageable: Pageable; query?: string }
>;

const initialState: ArticlesState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const articlesReducer = createReducer<ArticlesState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchArticles.request, (state, action) => {
        const { pageable, query } = action.payload;
        return {
          loadingState: LoadingState.LOADING,
          pageable,
          query,
        };
      })
      .addCase(fetchArticles.response, (state, action) => {
        const { result, totalPages } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            result,
            loadingState: LoadingState.LOADED,
            totalPages,
          };
        }
        return state;
      })
      .addCase(fetchArticles.error, (state, action) => {
        const { error } = action.payload;
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
