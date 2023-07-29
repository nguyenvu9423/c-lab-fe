import { createAction } from '@reduxjs/toolkit';

export interface ResetStatePayload {
  target?: string;
}

const resetState = createAction(
  'resetState',
  (payload?: ResetStatePayload) => ({
    payload: payload ?? {},
  }),
);

export { resetState };
