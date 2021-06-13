import { createAction } from '@reduxjs/toolkit';
import * as uuid from 'uuid';
import { defaultPrepare } from './shared';

const fetchArticle = {
  request: createAction('fetchArticle/request', defaultPrepare),
  response: createAction('fetchArticle/response', defaultPrepare),
};

const fetchArticles = {
  request: createAction('fetchArticles/request', (payload, meta) => ({
    payload,
    meta: { ...meta, requestId: uuid.v4() },
  })),
  response: createAction('fetchArticles/response', defaultPrepare),
};

export { fetchArticle, fetchArticles };
