import { createReducer } from '@reduxjs/toolkit';
import { DataHolderState } from './shared';
import { fetchArticle, resetState } from '../../actions';
import { LoadingState } from '../../common';

export type ArticleState = DataHolderState<
  Record<string, unknown>,
  { id: number }
>;

const initialState: ArticleState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const articleReducer = createReducer<ArticleState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchArticle.request, () => ({
        loadingState: LoadingState.LOADING,
      }))
      .addCase(fetchArticle.response, (state, action) => {
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
      .addCase(fetchArticle.error, (state, action) => {
        const { error } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            error,
            loadingState: LoadingState.ERROR,
          };
        }
        return state;
      })
      .addCase(resetState, () => initialState);
  },
);
