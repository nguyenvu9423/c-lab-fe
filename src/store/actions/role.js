import { createAction } from '@reduxjs/toolkit';
import { defaultPrepare } from './shared';

const fetchRole = {
  request: createAction('fetchRole/request', defaultPrepare),
  response: createAction('fetchRole/response', defaultPrepare)
};

const fetchRoles = {
  request: createAction('fetchRoles/request', defaultPrepare),
  response: createAction('fetchRoles/response', defaultPrepare)
};

export { fetchRoles, fetchRole };
