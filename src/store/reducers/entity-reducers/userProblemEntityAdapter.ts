import { UserProblemResult } from '@/domains/submission';
import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';

export const userProblemResultAdapter = createEntityAdapter<UserProblemResult>({
  selectId: (model) => `${model.userId}-${model.problemId}`,
});

export const userProblemResultEntityReducer = createReducer(
  userProblemResultAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.userProblemResult,
      (state, { payload }) => {
        userProblemResultAdapter.upsertMany(
          state,
          payload.entities.userProblemResult,
        );
      },
    );
  },
);
