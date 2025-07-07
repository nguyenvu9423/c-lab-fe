import { UserContestRegistration } from '@/domains/contest';
import { deleteEntity } from '@/store/actions';
import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';

export const userContestRegistrationEntityAdapter =
  createEntityAdapter<UserContestRegistration>({
    selectId: (model) => `${model.user.id}-${model.contestId}`,
  });

export const userContestRegistrationEntityReducer = createReducer(
  userContestRegistrationEntityAdapter.getInitialState(),
  (builder) => {
    builder
      .addCase(deleteEntity, (state, { payload }) => {
        const { id } = payload;
        return userContestRegistrationEntityAdapter.removeOne(state, id);
      })
      .addMatcher(
        ({ payload }) => !!payload?.entities?.userContestRegistration,
        (state, { payload }) => {
          userContestRegistrationEntityAdapter.upsertMany(
            state,
            payload.entities.userContestRegistration,
          );
        },
      );
  },
);
