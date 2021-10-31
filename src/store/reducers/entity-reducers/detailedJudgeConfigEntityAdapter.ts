import { createEntityAdapter, createReducer } from '@reduxjs/toolkit';
import { DetailedJudgeConfig } from '../../../domains/judge-config';

export const detailedJudgeConfigEntityAdapter =
  createEntityAdapter<DetailedJudgeConfig>();

export const detailedJudgeConfigEntityReducer = createReducer(
  detailedJudgeConfigEntityAdapter.getInitialState(),
  (builder) => {
    builder.addMatcher(
      (action) => !!action.payload?.entities?.detailedJudgeConfig,
      (state, { payload }) => {
        detailedJudgeConfigEntityAdapter.upsertMany(
          state,
          payload.entities.detailedJudgeConfig
        );
      }
    );
  }
);
