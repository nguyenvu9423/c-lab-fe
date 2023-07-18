import { BaseException } from '../../shared/exceptions/BaseException';
export const defaultPayloadCreators = (payload) => payload;

export function defaultPrepare(payload: any, meta?: any) {
  return { payload, meta };
}

export interface BaseFetchErrorPayload extends BaseFetchPayload {
  error: BaseException;
}

export interface BaseFetchPayload {
  target?: string;
  requestId?: string;
}
