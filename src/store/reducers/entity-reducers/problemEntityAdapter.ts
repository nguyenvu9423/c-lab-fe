import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { Problem } from './../../../domains/problem/Problem';

export const problemEntityAdapter = createEntityAdapter<Problem>();

export const problemEntityReducer = createReducer(
  problemEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.problem,
      (state, { payload }) => {
        problemEntityAdapter.upsertMany(state, payload.entities.problem);
      }
    );
  }
);
