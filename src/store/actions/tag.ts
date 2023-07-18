import { createAction } from '@reduxjs/toolkit';
import { Pageable } from './../../utils/Pageable';
import { Tag } from './../../domains/tag/Tag';
import { BaseFetchPayload, BaseFetchErrorPayload } from './shared';
import { NormalizedEntities } from '../../entity-schemas/types';

export namespace FetchTag {
  export interface RequestPayload extends BaseFetchPayload {
    id: number;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<Tag>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchTag = {
  request: createAction(
    'fetchTag/request',
    (payload: FetchTag.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchTag/response',
    (payload: FetchTag.ResponsePayload) => ({ payload })
  ),
  error: createAction('fetchTag/error', (payload: FetchTag.ErrorPayload) => ({
    payload,
    error: true,
  })),
};

export namespace FetchTags {
  export interface RequestPayload extends BaseFetchPayload {
    pageable: Pageable;
    query?: any;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<Tag>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchTags = {
  request: createAction(
    'fetchTags/request',
    (payload: FetchTags.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchTags/response',
    (payload: FetchTags.ResponsePayload) => ({ payload })
  ),
  error: createAction('fetchTags/error', (payload: FetchTags.ErrorPayload) => ({
    payload,
    error: true,
  })),
};
