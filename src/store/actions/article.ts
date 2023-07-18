import * as uuid from 'uuid';
import { NormalizedEntities } from './../../entity-schemas/types';
import { Pageable } from './../../utils/Pageable';
import { createAction } from '@reduxjs/toolkit';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';
import { Article } from '../../domains/article';

export namespace FetchArticle {
  export interface RequestPayload extends BaseFetchPayload {
    id: number;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<Article>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchArticle = {
  request: createAction(
    'fetchArticle/request',
    (payload: FetchArticle.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchArticle/response',
    (payload: FetchArticle.ResponsePayload) => ({ payload })
  ),
  error: createAction(
    'fetchArticle/error',
    (payload: FetchArticle.ErrorPayload) => ({ payload, error: true })
  ),
};

export namespace FetchArticles {
  export interface RequestPayload extends BaseFetchPayload {
    pageable: Pageable;
    query?: string;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number[];
    entities: NormalizedEntities<Article>;
    totalPages: number;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchArticles = {
  request: createAction(
    'fetchArticles/request',
    (payload: FetchArticles.RequestPayload) => ({
      payload: { ...payload, requestId: uuid.v4() },
    })
  ),
  response: createAction(
    'fetchArticles/response',
    (payload: FetchArticles.ResponsePayload) => ({ payload })
  ),

  error: createAction(
    'fetchArticles/error',
    (payload: FetchArticles.ErrorPayload) => ({ payload, error: true })
  ),
};
