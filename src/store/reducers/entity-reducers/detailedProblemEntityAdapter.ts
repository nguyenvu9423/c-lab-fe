import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { DetailedProblem } from '@/domains/problem/Problem';

export const detailedProblemEntityAdapter =
  createEntityAdapter<DetailedProblem>();

export const detailedProblemEntityReducer = createReducer(
  detailedProblemEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.detailedProblem,
      (state, { payload }) => {
        detailedProblemEntityAdapter.upsertMany(
          state,
          payload.entities.detailedProblem,
        );
      },
    );
  },
);
