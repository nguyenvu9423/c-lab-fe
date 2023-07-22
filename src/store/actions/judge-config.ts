import { JudgeConfig } from '@/domains/judge-config';
import { NormalizedEntities } from '../../entity-schemas';
import { BaseFetchPayload, BaseFetchErrorPayload } from './shared';
import { createAction } from '@reduxjs/toolkit';

export namespace FetchJudgeConfig {
  export interface RequestPayload extends BaseFetchPayload {
    problemCode: string;
  }

  export interface ResponsePayload extends BaseFetchPayload {
    result: number;
    entities: NormalizedEntities<JudgeConfig>;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const fetchJudgeConfig = {
  request: createAction(
    'fetchJudgeConfig/request',
    (payload: FetchJudgeConfig.RequestPayload) => ({ payload })
  ),
  response: createAction(
    'fetchJudgeConfig/response',
    (payload: FetchJudgeConfig.ResponsePayload) => ({ payload })
  ),
  error: createAction(
    'fetchJudgeConfig/error',
    (payload: FetchJudgeConfig.ErrorPayload) => ({ payload, error: true })
  ),
};
