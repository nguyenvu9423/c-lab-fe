import { Toast, addToast, removeToast } from './../actions/toast';
import { createReducer } from '@reduxjs/toolkit';

export type ToastsState = Toast[];

const initialState: ToastsState = [];

export const toastsReducer = createReducer<ToastsState>(
  initialState,
  (builder) => {
    builder
      .addCase(addToast, (state, action) => {
        state.push(action.payload.toast);
      })
      .addCase(removeToast, (state, action) => {
        return state.filter((toast) => toast.id !== action.payload.id);
      });
  }
);
