import { ContestUserResult } from '@/domains/contest/ContestUserResult';
import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';

export const contestUserResultAdapter = createEntityAdapter<ContestUserResult>({
  selectId: (model) => `${model.contest.id}-${model.user.id}`,
});

export const contestUserResultEntityReducer = createReducer(
  contestUserResultAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.contestUserResult,
      (state, { payload }) => {
        contestUserResultAdapter.upsertMany(
          state,
          payload.entities.contestUserResult,
        );
      },
    );
  },
);
