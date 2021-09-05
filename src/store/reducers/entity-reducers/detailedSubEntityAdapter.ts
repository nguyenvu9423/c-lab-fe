import { DetailedSub } from '../../../domains/submission';
import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';

export const detailedSubEntityAdapter = createEntityAdapter<DetailedSub>();

export const detailedSubEntityReducer = createReducer(
  detailedSubEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.detailedSub,
      (state, { payload }) => {
        detailedSubEntityAdapter.upsertMany(
          state,
          payload.entities.detailedSub
        );
      }
    );
  }
);
