import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { User } from '@/domains/user';

export const userEntityAdapter = createEntityAdapter<User>();

export const userEntityReducer = createReducer(
  userEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.user,
      (state, { payload }) => {
        userEntityAdapter.upsertMany(state, payload.entities.user);
      }
    );
  }
);
