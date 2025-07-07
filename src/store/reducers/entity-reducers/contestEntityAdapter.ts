import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { Contest } from '@/domains/contest';

export const contestEntityAdapter = createEntityAdapter<Contest>();

export const contestEntityReducer = createReducer(
  contestEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      (action) => !!action.payload?.entities?.contest,
      (state, { payload }) => {
        contestEntityAdapter.upsertMany(state, payload.entities.contest);
      },
    );
  },
);
