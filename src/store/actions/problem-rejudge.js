import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const fetchProblemRejudge = {
  request: createAction('fetchProblemRejudge/request', defaultPrepare),
  response: createAction('fetchProblemRejudge/response', defaultPrepare),
};

export { fetchProblemRejudge };
