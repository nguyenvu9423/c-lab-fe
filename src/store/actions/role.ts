import { createAction } from '@reduxjs/toolkit';
import { Role } from '@/domains/role';
import { NormalizedEntities } from '../../entity-schemas';
import { BaseFetchPayload, BaseFetchErrorPayload } from './shared';
import { Pageable } from '../../utils';

export namespace FetchRole {
  export interface RequestPayload extends BaseFetchPayload {
    id: number;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<Role>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

const fetchRole = {
  request: createAction(
    'fetchRole/request',
    (payload: FetchRole.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchRole/response',
    (payload: FetchRole.ResponsePayload) => ({ payload })
  ),
  error: createAction('fetchRole/error', (payload: FetchRole.ErrorPayload) => ({
    payload,
    error: true,
  })),
};

export namespace FetchRoles {
  export interface RequestPayload extends BaseFetchPayload {
    pageable: Pageable;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<Role>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

const fetchRoles = {
  request: createAction(
    'fetchRoles/request',
    (payload: FetchRoles.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchRoles/response',
    (payload: FetchRoles.ResponsePayload) => ({ payload })
  ),
  error: createAction(
    'fetchRoles/error',
    (payload: FetchRoles.ErrorPayload) => ({
      payload,
      error: true,
    })
  ),
};

export { fetchRoles, fetchRole };
