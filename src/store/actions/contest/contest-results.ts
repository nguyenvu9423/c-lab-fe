import { Pageable } from '@/utils/Pageable';
import { BaseFetchErrorPayload, BaseFetchPayload } from '../shared';
import { NormalizedEntities } from '@/entity-schemas/types';
import { ContestUserResult } from '@/domains/contest/ContestUserResult';
import { createAction } from '@reduxjs/toolkit';

export namespace FetchContestUserResults {
  export interface RequestPayload extends BaseFetchPayload {
    contestId: number;
    pageable: Pageable;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<ContestUserResult>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchContestUserResults = {
  request: createAction(
    'fetchContestUserResults/request',
    (payload: FetchContestUserResults.RequestPayload) => ({ payload }),
  ),
  response: createAction(
    'fetchContestUserResults/response',
    (payload: FetchContestUserResults.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchContestUserResults/error',
    (payload: FetchContestUserResults.ErrorPayload) => ({
      payload,
      error: true,
    }),
  ),
};
