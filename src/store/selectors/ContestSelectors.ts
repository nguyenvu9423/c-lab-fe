import { Selector, EntityId } from '@reduxjs/toolkit';
import { State } from './../state';
import { contestEntityAdapter } from '../reducers/entity-reducers/contestEntityAdapter';
import { Contest } from '@/domains/contest';

const contestEntitySelectors = contestEntityAdapter.getSelectors(
  (state: State) => state.entity.contest,
);

export namespace ContestSelectors {
  export function byId(id: EntityId): Selector<State, Contest> {
    return (state) => {
      const entity = contestEntitySelectors.selectById(state, id);
      if (!entity) throw new Error('Contest not found');
      return entity;
    };
  }

  export function byIds(ids: EntityId[]): Selector<State, Contest[]> {
    return (state) =>
      ids.map((id) => {
        const entity = contestEntitySelectors.selectById(state, id);
        if (!entity) throw new Error('Contest not found');
        return entity;
      });
  }
}
