import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { Article } from '@/domains/article';

export const articleEntityAdapter = createEntityAdapter<Article>();

export const articleEntityReducer = createReducer(
  articleEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      (action) => !!action.payload?.entities?.article,
      (state, { payload }) => {
        if (payload?.entities?.article) {
          articleEntityAdapter.upsertMany(state, payload.entities.article);
        }
      },
    );
  },
);
