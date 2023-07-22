import { createAction } from '@reduxjs/toolkit';

import { Submission, DetailedSub } from '@/domains/submission';
import { NormalizedEntities } from '../../entity-schemas';
import { Pageable } from './../../utils/Pageable';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';

export namespace FetchSubmissions {
  export interface BaseRequestPayload extends BaseFetchPayload {
    type?: string;
    target?: string;
    query?: string;
    pageable: Pageable;
  }

  export interface byQuery extends BaseRequestPayload {
    type: 'byQuery';
    query?: string;
  }

  export interface byUser extends BaseRequestPayload {
    type: 'byUser';
    username: string;
  }

  export interface byUserAndProblem extends BaseRequestPayload {
    type: 'byUserAndProblem';
    username: string;
    problemCode: string;
  }

  export interface byProblem extends BaseRequestPayload {
    type: 'byProblem';
    problemCode: string;
  }

  export type RequestPayload = byQuery | byUser | byProblem | byUserAndProblem;

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
