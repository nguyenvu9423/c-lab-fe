import { createAction, EntityId } from '@reduxjs/toolkit';
import { BaseFetchErrorPayload, BaseFetchPayload } from './shared';

export namespace EmailVerification {
  export interface RequestPayload extends BaseFetchPayload {
    id: string;
  }
  export interface ResponsePayload extends BaseFetchPayload {
    id: EntityId;
    user: { id: EntityId };
    hasRefreshedToken?: boolean;
  }

  export type ErrorPayload = BaseFetchErrorPayload;
}

export const verifyEmail = {
  request: createAction<EmailVerification.RequestPayload>(
    'emailVerification/request',
  ),
  response: createAction<EmailVerification.ResponsePayload>(
    'emailVerification/response',
  ),
  error: createAction(
    'emailVerification/error',
    (payload: EmailVerification.ErrorPayload) => ({ payload, error: true }),
  ),
};
