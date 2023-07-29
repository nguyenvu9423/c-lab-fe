import { EntityId } from '@reduxjs/toolkit';

export type EntityRef = EntityId | { id: EntityId };

export namespace EntityRef {
  export function getId(ref: EntityRef): EntityId {
    return typeof ref !== 'object' ? ref : ref.id;
  }
}
