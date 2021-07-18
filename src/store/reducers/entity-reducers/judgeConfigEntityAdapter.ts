import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { JudgeConfig } from '../../../domains/judge-config';

export const judgeConfigEntityAdapter = createEntityAdapter<JudgeConfig>();

export const judgeConfigEntityReducer = createReducer(
  judgeConfigEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      (action) => !!action.payload?.entities?.judgeConfig,
      (state, { payload }) => {
        judgeConfigEntityAdapter.upsertMany(
          state,
          payload.entities.judgeConfig
        );
      }
    );
  }
);
