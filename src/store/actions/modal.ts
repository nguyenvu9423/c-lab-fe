import { createAction } from '@reduxjs/toolkit';
import { ModalState } from '../reducers/modalReducer';

export const setModal = createAction('setModal', (payload: ModalState) => ({
  payload,
}));
