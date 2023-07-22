import { createAction } from '@reduxjs/toolkit';
import { NormalizedEntities } from '../../entity-schemas';
import { User } from '@/domains/user/User';
import {
  defaultPrepare,
  BaseFetchPayload,
  BaseFetchErrorPayload,
} from './shared';
import { Pageable } from '../../utils';

export namespace FetchUser {
  export interface ByIdRequestPayload extends BaseFetchPayload {
    type: 'byId';
    id: number;
  }

  export interface ByUsernameRequestPayload extends BaseFetchPayload {
    type: 'byUsername';
    username: string;
  }

  export interface PrincipalRequestPayload extends BaseFetchPayload {
    type: 'principal';
  }

  export type RequestPayload =
    | ByIdRequestPayload
    | ByUsernameRequestPayload
    | PrincipalRequestPayload;

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<User>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchUser = {
  request: createAction(
    'fetchUser/request',
    (payload: FetchUser.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchUser/response',
    (payload: FetchUser.ResponsePayload) => ({ payload })
  ),
  error: createAction('fetchUser/error', (payload: FetchUser.ErrorPayload) => ({
    payload,
    error: true,
  })),
};

export namespace FetchUsers {
  export interface RequestPayload extends BaseFetchPayload {
    pageable: Pageable;
    query?: string;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<User>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchUsers = {
  request: createAction(
    'fetchUsers/request',
    (payload: FetchUsers.RequestPayload) => ({
      payload: {
        ...payload,
        query: payload.query ? payload.query : undefined,
      },
    })
  ),
  response: createAction(
    'fetchUsers/response',
    (payload: FetchUsers.ResponsePayload) => ({ payload })
  ),
  error: createAction(
    'fetchUsers/error',
    (payload: FetchUsers.ErrorPayload) => ({ payload, error: true })
  ),
};

export const clearUser = createAction('clearUser', defaultPrepare);
