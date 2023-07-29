import { createReducer } from '@reduxjs/toolkit';
import { setModal } from '../actions';

export type ModalState = DetailedSubModalState | null;

export type DefinedModalState<T extends string, P = unknown> = {
  type: T;
  props: P;
};

export type DetailedSubModalState = DefinedModalState<
  'DETAILED_SUB',
  {
    submissionId: number;
  }
>;

const initialState: ModalState = null;

export const modalReducer = createReducer<ModalState>(
  initialState,
  (builder) => {
    builder.addCase(setModal, (state, action: any) => {
      const modalState = action.payload;
      return modalState;
    });
  },
);
