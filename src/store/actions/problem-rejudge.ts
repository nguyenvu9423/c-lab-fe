import { NormalizedEntities } from '../../entity-schemas';
import { ProblemRejudge } from '@/domains/problem-rejudge/ProblemRejudge';
import { createAction } from '@reduxjs/toolkit';
import { BaseFetchPayload, BaseFetchErrorPayload } from './shared';

export namespace FetchProblemRejudge {
  export type RequestPayload = ByIdRequestPayload | ByCodeRequestPayload;

  export interface BaseRequestPayload extends BaseFetchPayload {
    type: string;
  }

  export interface ByIdRequestPayload extends BaseRequestPayload {
    type: 'byId';
    problemId: number;
  }

  export interface ByCodeRequestPayload extends BaseRequestPayload {
    type: 'byCode';
    problemCode: string;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<ProblemRejudge>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchProblemRejudge = {
  request: createAction(
    'fetchProblemRejudge/request',
    (payload: FetchProblemRejudge.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchProblemRejudge/response',
    (payload: FetchProblemRejudge.ResponsePayload) => ({ payload })
  ),
  error: createAction(
    'fetchProblemRejudge/error',
    (payload: FetchProblemRejudge.ErrorPayload) => ({ payload, error: true })
  ),
};
