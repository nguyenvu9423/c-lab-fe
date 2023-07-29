import { createAction } from '@reduxjs/toolkit';

export interface UpdateEntityPayload {
  entities: any;
}

const updateEntity = createAction(
  'updateEntity',
  (payload: UpdateEntityPayload) => ({ payload }),
);

export { updateEntity };
