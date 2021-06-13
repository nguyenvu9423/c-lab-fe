import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const fetchAllSubmissionLangs = {
  request: createAction('fetchAllSubmissionLangs/request', defaultPrepare),
  response: createAction('fetchAllSubmissionLangs/response', defaultPrepare)
};

export { fetchAllSubmissionLangs };
