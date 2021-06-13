import { createAction } from '@reduxjs/toolkit';
import * as uuid from 'uuid';
import { defaultPrepare } from './shared';

const fetchTag = {
  request: createAction('fetchTag/request', defaultPrepare),
  response: createAction('fetchTag/response', defaultPrepare)
};

const fetchTags = {
  request: createAction('fetchTags/request', (payload, meta) => ({
    payload: payload,
    meta: { ...meta, requestId: uuid.v4() }
  })),
  response: createAction('fetchTags/response', defaultPrepare)
};

export { fetchTag, fetchTags };
