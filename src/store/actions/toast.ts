import * as uuid from 'uuid';
import { Optional } from 'utility-types';
import { createAction } from '@reduxjs/toolkit';

export interface AddToastPayload {
  toast: Toast;
}

export type Toast = NotificationToast;

export interface NotificationToast {
  id: string;
  header: string;
  content: string;
  status?: 'positive' | 'negative';
  duration?: number;
}

export const addToast = createAction(
  'addToast',
  (toast: Optional<Toast, 'id'>) => {
    if (toast.id) {
      return { payload: { toast: { id: toast.id, ...toast } } };
    } else {
      return { payload: { toast: { id: uuid.v4(), ...toast } } };
    }
  }
);

export interface RemoveToastPayload {
  id: string;
}

export const removeToast = createAction(
  'removeToast',
  (payload: RemoveToastPayload) => ({ payload })
);
