import { createAction } from '@reduxjs/toolkit';
import * as uuid from 'uuid';
import { defaultPrepare } from './shared';

const fetchProblem = {
  request: createAction('fetchProblem/request', defaultPrepare),
  response: createAction('fetchProblem/response', defaultPrepare)
};

const fetchProblems = {
  request: createAction('fetchProblems/request', (payload, meta) => ({
    payload: { ...payload, query: payload.query ? payload.query : undefined },
    meta: { ...meta, requestId: uuid.v4() }
  })),
  response: createAction('fetchProblems/response', defaultPrepare)
};

export { fetchProblem, fetchProblems };
