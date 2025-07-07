import { Problem, DetailedProblem } from '@/domains/problem/Problem';
import { NormalizedEntities } from '../../entity-schemas';
import { createAction } from '@reduxjs/toolkit';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';
import { Pageable } from '../../utils';

export namespace FetchProblem {
  interface BaseRequestPayload extends BaseFetchPayload {
    type: string;
  }

  export interface ByIdRequestPayload extends BaseRequestPayload {
    type: 'byId';
    id: number;
  }

  export interface ByCodeRequestPayload extends BaseRequestPayload {
    type: 'byCode';
    code: string;
  }

  export type RequestPayload = ByIdRequestPayload | ByCodeRequestPayload;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<Problem>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchProblem = {
  request: createAction(
    'fetchProblem/request',
    (payload: FetchProblem.RequestPayload) => ({ payload }),
  ),
  response: createAction(
    'fetchProblem/response',
    (payload: FetchProblem.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchProblem/error',
    (payload: FetchProblem.ErrorPayload) => ({ payload, error: true }),
  ),
};

export namespace FetchDetailedProblem {
  interface BaseRequestPayload extends BaseFetchPayload {
    type: string;
  }

  export interface ByIdRequestPayload extends BaseRequestPayload {
    type: 'byId';
    id: number;
  }

  export interface ByCodeRequestPayload extends BaseRequestPayload {
    type: 'byCode';
    code: string;
  }

  export type RequestPayload = ByIdRequestPayload | ByCodeRequestPayload;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<DetailedProblem>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchDetailedProblem = {
  request: createAction(
    'fetchDetailedProblem/request',
    (payload: FetchProblem.RequestPayload) => ({ payload }),
  ),
  response: createAction(
    'fetchDetailedProblem/response',
    (payload: FetchProblem.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchDetailedProblem/error',
    (payload: FetchProblem.ErrorPayload) => ({ payload, error: true }),
  ),
};

export namespace FetchProblems {
  export interface RequestPayload extends BaseFetchPayload {
    pageable: Pageable;

    query?: string;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<Problem>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchProblems = {
  request: createAction(
    'fetchProblems/request',
    (payload: FetchProblems.RequestPayload) => ({
      payload: { ...payload, query: payload.query ? payload.query : undefined },
    }),
  ),

  response: createAction(
    'fetchProblems/response',
    (payload: FetchProblems.ResponsePayload) => ({ payload }),
  ),

  error: createAction(
    'fetchProblems/error',
    (payload: FetchProblems.ErrorPayload) => ({ payload, error: true }),
  ),
};
