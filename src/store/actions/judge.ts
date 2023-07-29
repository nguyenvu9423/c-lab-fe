import { DetailedJudge } from '@/domains/judge';
import { NormalizedEntities } from '../../entity-schemas';
import { createAction } from '@reduxjs/toolkit';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';

export namespace FetchDetailedJudge {
  export interface RequestPayload extends BaseFetchPayload {
    submissionId: number;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<DetailedJudge>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

const fetchDetailedJudge = {
  request: createAction(
    'fetchDetailedJudge/request',
    (payload: FetchDetailedJudge.RequestPayload) => ({ payload }),
  ),
  response: createAction(
    'fetchDetailedJudge/response',
    (payload: FetchDetailedJudge.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchDetailedJudge/error',
    (payload: FetchDetailedJudge.ErrorPayload) => ({ payload, error: true }),
  ),
};

export { fetchDetailedJudge };
