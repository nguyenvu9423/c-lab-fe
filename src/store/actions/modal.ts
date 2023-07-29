import { createAction } from '@reduxjs/toolkit';

export const setModal = createAction('setModal', (payload: unknown) => ({
  payload,
}));
