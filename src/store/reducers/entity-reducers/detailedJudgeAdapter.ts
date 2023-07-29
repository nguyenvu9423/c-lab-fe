import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { DetailedJudge } from '@/domains/judge';

export const detailedJudgeEntityAdapter = createEntityAdapter<DetailedJudge>();

export const detailedJudgeEntityReducer = createReducer(
  detailedJudgeEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.detailedJudge,
      (state, { payload }) => {
        detailedJudgeEntityAdapter.upsertMany(
          state,
          payload.entities.detailedJudge,
        );
      },
    );
  },
);
