import { SearchResult } from './../../domains/search/SearchResult';
import * as uuid from 'uuid';
import { createAction } from '@reduxjs/toolkit';

import { BaseFetchPayload, BaseFetchErrorPayload } from './shared';

export namespace FetchSearch {
  export interface RequestPayload extends BaseFetchPayload {
    searchString: string;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    results: SearchResult[];
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchSearch = {
  request: createAction('fetchSearch/request', (searchString: string) => ({
    payload: { searchString, requestId: uuid.v4() },
  })),
  response: createAction(
    'fetchSearch/response',
    (payload: FetchSearch.ResponsePayload) => ({ payload })
  ),
  error: createAction(
    'fetchSearch/error',
    (payload: FetchSearch.ErrorPayload) => ({ payload, error: true })
  ),
  clear: createAction('fetchSearch/clear'),
};
