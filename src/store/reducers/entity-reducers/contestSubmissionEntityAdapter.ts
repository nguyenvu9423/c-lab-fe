import { ContestSubmission } from '@/domains/contest';
import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';

export const contestSubmissionEntityAdapter =
  createEntityAdapter<ContestSubmission>();

export const contestSubmissionEntityReducer = createReducer(
  contestSubmissionEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.contestSubmission,
      (state, { payload }) => {
        contestSubmissionEntityAdapter.upsertMany(
          state,
          payload.entities.contestSubmission,
        );
      },
    );
  },
);
