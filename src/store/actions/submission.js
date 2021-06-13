import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const fetchSubmissions = {
  request: createAction('fetchSubmissions/request', defaultPrepare),
  response: createAction('fetchSubmissions/response', defaultPrepare)
};

const fetchDetailedSubmission = {
  request: createAction('fetchDetailedSubmission/request', defaultPrepare),
  response: createAction('fetchDetailedSubmission/response', defaultPrepare)
};

const fetchDetailedResult = {
  request: createAction('fetchDetailedResult/request', defaultPrepare),
  response: createAction('fetchDetailedResult/response', defaultPrepare)
};

const clearDetailedResult = createAction('clearDetailedResult', defaultPrepare);

export {
  fetchSubmissions,
  fetchDetailedSubmission,
  fetchDetailedResult,
  clearDetailedResult
};
