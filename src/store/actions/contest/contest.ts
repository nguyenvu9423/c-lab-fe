import * as uuid from 'uuid';
import { Pageable } from '@/utils/Pageable';
import { BaseFetchErrorPayload, BaseFetchPayload } from '../shared';
import { NormalizedEntities } from '@/entity-schemas/types';
import { Contest } from '@/domains/contest';
import { createAction } from '@reduxjs/toolkit';
import { SortCriteria } from '@/shared/types';

export namespace FetchContest {
  interface BaseRequestPayload extends BaseFetchPayload {
    type: string;
  }

  export interface ByIdRequestPayload extends BaseRequestPayload {
    type: 'byId';
    id: number;
  }

  export type RequestPayload = ByIdRequestPayload;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<Contest>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export namespace FetchContests {
  export interface RequestPayload extends BaseFetchPayload {
    query?: string;
    pageable?: Pageable;
    sort?: SortCriteria;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<Contest>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchContest = {
  request: createAction(
    'fetchContest/request',
    (payload: FetchContest.RequestPayload) => ({
      payload: { ...payload, requestId: uuid.v4() },
    }),
  ),
  response: createAction(
    'fetchContest/response',
    (payload: FetchContest.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchContest/error',
    (payload: FetchContest.ErrorPayload) => ({ payload, error: true }),
  ),
};

export const fetchContests = {
  request: createAction(
    'fetchContests/request',
    (payload: FetchContests.RequestPayload) => ({
      payload: { ...payload, requestId: uuid.v4() },
    }),
  ),
  response: createAction(
    'fetchContests/response',
    (payload: FetchContests.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchContests/error',
    (payload: FetchContests.ErrorPayload) => ({ payload, error: true }),
  ),
};
