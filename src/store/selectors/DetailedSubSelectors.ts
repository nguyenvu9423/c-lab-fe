import { Selector } from '@reduxjs/toolkit';
import { detailedSubEntityAdapter } from './../reducers/entity-reducers/detailedSubEntityAdapter';
import { State } from './../state';
import { DetailedSub } from './../../domains/submission';

const detailedSubEntitySelectors = detailedSubEntityAdapter.getSelectors(
  (state: State) => state.entity.detailedSub
);

export namespace DetailedSubSelectors {
  export function byId(id: number): Selector<State, DetailedSub> {
    return (state) => {
      const detailedSub = detailedSubEntitySelectors.selectById(state, id);
      if (detailedSub === undefined) throw new Error();
      return detailedSub;
    };
  }
}
