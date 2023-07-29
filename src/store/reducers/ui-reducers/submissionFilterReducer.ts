import { createReducer } from '@reduxjs/toolkit';
import { setSubmissionFilter } from '../../actions';

export type SubmissionFilterState = any[];

const initialState: SubmissionFilterState = [];

export const submissionFilterReducer = createReducer<SubmissionFilterState>(
  initialState,
  (builder) => {
    builder.addCase(setSubmissionFilter, (state, action) => {
      const { filters } = action.payload;
      return filters;
    });
  },
);
