import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { ProblemRejudge } from '@/domains/problem-rejudge';

export const problemRejudgeEntityAdapter =
  createEntityAdapter<ProblemRejudge>();

export const problemRejudgeEntityReducer = createReducer(
  problemRejudgeEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.problemRejudge,
      (state, { payload }) => {
        problemRejudgeEntityAdapter.upsertMany(
          state,
          payload.entities.problemRejudge
        );
      }
    );
  }
);
