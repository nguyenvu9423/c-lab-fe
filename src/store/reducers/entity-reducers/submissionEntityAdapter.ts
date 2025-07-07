import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { Submission } from '@/domains/submission';

export const submissionEntityAdapter = createEntityAdapter<Submission>();

export const submissionEntityReducer = createReducer(
  submissionEntityAdapter.getInitialState(),
  (builder) => {
    builder
      .addMatcher(
        ({ payload }) => !!payload?.entities?.submission,
        (state, { payload }) => {
          submissionEntityAdapter.upsertMany(
            state,
            payload.entities.submission,
          );
        },
      )
      .addMatcher(
        ({ payload }) => !!payload?.entities?.contestSubmission,
        (state, { payload }) => {
          submissionEntityAdapter.upsertMany(
            state,
            payload.entities.contestSubmission,
          );
        },
      )
      .addMatcher(
        ({ payload }) => !!payload?.entities?.detailedSub,
        (state, { payload }) => {
          submissionEntityAdapter.upsertMany(
            state,
            payload.entities.detailedSub,
          );
        },
      );
  },
);
