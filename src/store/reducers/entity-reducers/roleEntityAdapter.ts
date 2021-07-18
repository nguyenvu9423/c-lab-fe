import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { Role } from './../../../domains/role/Role';

export const roleEntityAdapter = createEntityAdapter<Role>();

export const roleEntityReducer = createReducer(
  roleEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      ({ payload }) => !!payload?.entities?.role,
      (state, { payload }) => {
        roleEntityAdapter.upsertMany(state, payload.entities.role);
      }
    );
  }
);
