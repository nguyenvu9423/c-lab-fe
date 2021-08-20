import { DetailedSubModal } from './../../domains/submission/components/DetailedSubModal';
import { createReducer } from '@reduxjs/toolkit';
import { setModal } from '../actions';

export type ModalState = DetailedSubModalState | null;

export type DefinedModalState<T extends string, P = unknown> = {
  type: T;
  props: P;
};

export type DetailedSubModalState = DefinedModalState<
  'DETAILED_SUB',
  DetailedSubModal.Props
>;

const initialState: ModalState = null;

export const modalReducer = createReducer<ModalState>(
  initialState,
  (builder) => {
    builder.addCase(setModal, (state, action) => {
      const modalState = action.payload;
      return modalState;
    });
  }
);
