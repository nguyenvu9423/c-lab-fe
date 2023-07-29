import { Judge } from '@/domains/judge';
import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';

export const judgeEntityAdapter = createEntityAdapter<Judge>();

export const judgeEntityReducer = createReducer(
  judgeEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.judge,
      (state, { payload }) => {
        judgeEntityAdapter.upsertMany(state, payload.entities.judge);
      },
    );
  },
);
