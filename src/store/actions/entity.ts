import { createAction, EntityId } from '@reduxjs/toolkit';

export interface UpdateEntityPayload {
  entities: any;
}

const updateEntity = createAction(
  'updateEntity',
  (payload: UpdateEntityPayload) => ({ payload }),
);

export interface DeleteEntityPayload {
  id: EntityId;
}

const deleteEntity = createAction(
  'deleteEntity',
  (payload: DeleteEntityPayload) => ({ payload }),
);

export { updateEntity, deleteEntity };
