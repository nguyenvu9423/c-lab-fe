import { Pageable } from '@/utils/Pageable';
import { BaseFetchErrorPayload, BaseFetchPayload } from '../shared';
import { createAction } from '@reduxjs/toolkit';
import { NormalizedEntities } from '@/entity-schemas/types';
import { ContestSubmission } from '@/domains/contest';

export namespace FetchContestSubmissions {
  export interface BaseRequestPayload extends BaseFetchPayload {
    type?: string;
    pageable: Pageable;
  }

  export interface ByUser extends BaseRequestPayload {
    type: 'byUser';
    contestId: number;
    username: string;
  }

  export interface ByQuery extends BaseRequestPayload {
    type: 'byQuery';
    contestId: number;
    query: string;
  }

  export type RequestPayload = ByUser | ByQuery;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<ContestSubmission>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchContestSubmissions = {
  request: createAction(
    'fetchContestSubmissions/request',
    (payload: FetchContestSubmissions.RequestPayload) => ({ payload }),
  ),
  response: createAction(
    'fetchContestSubmissions/response',
    (payload: FetchContestSubmissions.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchContestSubmissions/error',
    (payload: FetchContestSubmissions.ErrorPayload) => ({
      payload,
      error: true,
    }),
  ),
};
