import { createAction } from '@reduxjs/toolkit';
import { ProblemRejudge } from '@/domains/problem-rejudge/ProblemRejudge';
import { NormalizedEntities } from '../../../entity-schemas';
import { BaseFetchPayload, BaseFetchErrorPayload } from '../shared';

export namespace FetchContestProblemRejudge {
  export type RequestPayload = LatestRequestPayload;

  export interface BaseRequestPayload extends BaseFetchPayload {
    type: string;
  }

  export interface LatestRequestPayload extends BaseRequestPayload {
    type: 'latest';
    contestId: number;
    problemId: number;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number | null;
    entities: NormalizedEntities<ProblemRejudge>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchContestProblemRejudge = {
  request: createAction(
    'fetchContestProblemRejudge/request',
    (payload: FetchContestProblemRejudge.RequestPayload) => ({ payload }),
  ),
  response: createAction(
    'fetchContestProblemRejudge/response',
    (payload: FetchContestProblemRejudge.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchContestProblemRejudge/error',
    (payload: FetchContestProblemRejudge.ErrorPayload) => ({
      payload,
      error: true,
    }),
  ),
};
