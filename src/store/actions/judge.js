import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const fetchJudge = {
  request: createAction('fetchJudge/request', defaultPrepare),
  response: createAction('fetchJudge/response', defaultPrepare),
};

const fetchDetailedJudge = {
  request: createAction('fetchDetailedJudge/request', defaultPrepare),
  response: createAction('fetchDetailedJudge/response', defaultPrepare),
};

export { fetchJudge, fetchDetailedJudge };
