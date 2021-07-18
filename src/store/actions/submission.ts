import { Submission } from './../../domains/submission/submission';
import { NormalizedEntities } from './../../entity-schemas/types';
import { createAction } from '@reduxjs/toolkit';
import { Pageable } from './../../utility/Pageable';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';
import { DetailedSub } from '../../domains/submission';

namespace FetchSubmissions {
  interface BaseRequestPayload extends BaseFetchPayload {
    type: string;
    target?: string;
    pageable: Pageable;
  }

  interface byUser extends BaseRequestPayload {
    type: 'byUser';
    userId: number;
  }

  interface byUserAndProblem extends BaseRequestPayload {
    type: 'byUserAndProblem';
    userId: number;
    problemId: number;
  }

  interface byProblem extends BaseRequestPayload {
    type: 'byProblem';
    problemId: number;
  }

  interface byProblemAndQuery extends BaseRequestPayload {
    type: 'byProblemAndQuery';
    problemId: number;
    query: string;
  }

  export type RequestPayload =
    | byUser
    | byProblem
    | byUserAndProblem
    | byProblemAndQuery;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<Submission>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchSubmissions = {
  request: createAction(
    'fetchSubmissions/request',
    (payload: FetchSubmissions.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchSubmissions/response',
    (payload: FetchSubmissions.ResponsePayload) => ({
      payload,
    })
  ),
  error: createAction(
    'fetchSubmissions/error',
    (payload: FetchSubmissions.ErrorPayload) => ({
      payload,
      error: true,
    })
  ),
};

export namespace FetchDetailedSub {
  export interface RequestPayload extends BaseFetchPayload {
    submissionId: number;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<DetailedSub>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchDetailedSub = {
  request: createAction(
    'fetchDetailedSub/request',
    (payload: FetchDetailedSub.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchDetailedSub/response',
    (payload: FetchDetailedSub.ResponsePayload) => ({ payload })
  ),
  error: createAction(
    'fetchDetailedSub/error',
    (payload: FetchDetailedSub.ErrorPayload) => ({ payload, error: true })
  ),
};
