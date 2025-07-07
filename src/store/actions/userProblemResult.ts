import { createAction } from '@reduxjs/toolkit';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';
import { NormalizedEntities } from '@/entity-schemas/types';
import { UserProblemResult } from '@/domains/submission';

export namespace FetchUserProblemResults {
  export interface BaseRequestPayload extends BaseFetchPayload {
    type?: string;
  }

  export interface byUsersAndProblems extends BaseFetchPayload {
    type: 'byUsersAndProblems';
    userIds: number[];
    problemIds: number[];
  }

  export type RequestPayload = byUsersAndProblems;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];

    entities: NormalizedEntities<UserProblemResult>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchUserProblemResults = {
  request: createAction(
    'fetchUserProblemResult/request',
    (payload: FetchUserProblemResults.RequestPayload) => ({ payload }),
  ),
  response: createAction(
    'fetchUserProblemResult/response',
    (payload: FetchUserProblemResults.ResponsePayload) => ({ payload }),
  ),
  error: createAction(
    'fetchUserProblemResult/error',
    (payload: FetchUserProblemResults.ErrorPayload) => ({ payload }),
  ),
};
