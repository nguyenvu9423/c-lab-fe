import { User } from './../../domains/user/User';
import { State } from './../state';
import { userEntityAdapter } from '../reducers/entity-reducers/userEntityAdapter';
import { Selector, EntityId } from '@reduxjs/toolkit';

const userEntitySelectors = userEntityAdapter.getSelectors(
  (state: State) => state.entity.user
);

export namespace UserSelectors {
  export function selectById(id: EntityId): Selector<State, User> {
    return (state) => {
      const user = userEntitySelectors.selectById(state, id);
      if (!user) {
        throw new Error(`Could not find the user with id ${id}`);
      }
      return user;
    };
  }

  export function selectByIds(ids: EntityId[]): Selector<State, User[]> {
    return (state) =>
      ids.map((id) => {
        const user = userEntitySelectors.selectById(state, id);
        if (!user) {
          throw new Error(`Could not find the user with id ${id}`);
        }
        return user;
      });
  }
}
