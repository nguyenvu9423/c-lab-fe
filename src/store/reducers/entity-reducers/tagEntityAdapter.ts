import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { Tag } from './../../../domains/tag/Tag';

export const tagEntityAdapter = createEntityAdapter<Tag>();

export const tagEntityReducer = createReducer(
  tagEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.tag,
      (state, { payload }) => {
        tagEntityAdapter.upsertMany(state, payload.entities.tag);
      }
    );
  }
);
