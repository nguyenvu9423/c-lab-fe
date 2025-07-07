import { NormalizedEntities } from '@/entity-schemas/types';
import { BaseFetchErrorPayload, BaseFetchPayload } from '../shared';
import { UserContestRegistration } from '@/domains/contest';
import { createAction } from '@reduxjs/toolkit';
import { Pageable } from '@/utils/Pageable';

export namespace FetchUserContestRegistrations {
  export interface BaseRequestPayload extends BaseFetchPayload {
    type?: string;
    pageable: Pageable;
  }

  export interface byContest extends BaseRequestPayload {
    type: 'byContest';
    contestId: number;
  }

  export interface byUserAndContests extends BaseRequestPayload {
    type: 'byUserAndContests';
    userId: number;
    contestIds: number[];
  }

  export type RequestPayload = byContest | byUserAndContests;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<UserContestRegistration>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchUserContestRegistrations = {
  request: createAction(
    'fetchUserContestRegistrations/request',
    (payload: FetchUserContestRegistrations.RequestPayload) => ({
      payload,
    }),
  ),
  response: createAction(
    'fetchUserContestRegistrations/response',
    (payload: FetchUserContestRegistrations.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchUserContestRegistrations/error',
    (payload: FetchUserContestRegistrations.ErrorPayload) => ({
      payload,
      error: true,
    }),
  ),
};

export namespace FetchUserContestRegistration {
  export interface byUserAndContest extends BaseFetchPayload {
    userId: number;
    contestId: number;
  }

  export type RequestPayload = byUserAndContest;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number | null;
    entities: NormalizedEntities<UserContestRegistration>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchUserContestRegistration = {
  request: createAction(
    'fetchUserContestRegistration/request',
    (payload: FetchUserContestRegistration.RequestPayload) => ({
      payload,
    }),
  ),
  response: createAction(
    'fetchUserContestRegistration/response',
    (payload: FetchUserContestRegistration.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchUserContestRegistration/error',
    (payload: FetchUserContestRegistration.ErrorPayload) => ({
      payload,
      error: true,
    }),
  ),
};
