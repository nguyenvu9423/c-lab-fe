import { Role } from './../../domains/role/Role';
import { State } from './../state';
import { roleEntityAdapter } from './../reducers/entity-reducers/roleEntityAdapter';
import { Selector, EntityId } from '@reduxjs/toolkit';

const roleEntitySelectors = roleEntityAdapter.getSelectors(
  (state: State) => state.entity.role
);

export namespace RoleSelectors {
  export function byId(id: number): Selector<State, Role | undefined> {
    return (state) => roleEntitySelectors.selectById(state, id);
  }

  export function selectByIds(ids: EntityId[]): Selector<State, Role[]> {
    return (state) =>
      ids.map((id) => {
        const role = roleEntitySelectors.selectById(state, id);
        if (!role) {
          throw new Error('Could not find the role');
        }
        return role;
      });
  }
}
