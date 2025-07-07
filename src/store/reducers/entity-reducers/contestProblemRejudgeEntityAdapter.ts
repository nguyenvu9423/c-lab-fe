import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { ContestProblemRejudge } from '@/domains/contest';

export const contestProblemRejudgeEntityAdapter =
  createEntityAdapter<ContestProblemRejudge>();

export const contestProblemRejudgeEntityReducer = createReducer(
  contestProblemRejudgeEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.contestProblemRejudge,
      (state, { payload }) => {
        contestProblemRejudgeEntityAdapter.upsertMany(
          state,
          payload.entities.contestProblemRejudge,
        );
      },
    );
  },
);
