import { createAction } from '@reduxjs/toolkit';

export interface SetSubmissionFilterPayload {
  filters: any[];
}

const setSubmissionFilter = createAction<SetSubmissionFilterPayload>(
  'setSubmissionFilter'
);

export { setSubmissionFilter };
