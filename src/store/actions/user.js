import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';
import * as uuid from 'uuid';

const fetchUser = {
  request: createAction('fetchUser/request', defaultPrepare),
  response: createAction('fetchUser/response', defaultPrepare),
};

const fetchUsers = {
  request: createAction('fetchUsers/request', (payload, meta) => ({
    payload,
    meta: { ...meta, requestId: uuid.v4() },
  })),
  response: createAction('fetchUsers/response', defaultPrepare),
};

const clearUser = createAction('clearUser', defaultPrepare);

export { fetchUsers, fetchUser, clearUser };
