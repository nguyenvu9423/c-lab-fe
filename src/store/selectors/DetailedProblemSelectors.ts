import { detailedProblemEntityAdapter } from './../reducers/entity-reducers/detailedProblemEntityAdapter';
import { State } from './../state';
import { DetailedProblem } from '@/domains/problem/Problem';
import { EntityId, Selector } from '@reduxjs/toolkit';

const entitySelectors = detailedProblemEntityAdapter.getSelectors(
  (state: State) => state.entity.detailedProblem
);

export namespace DetailedProblemSelectors {
  export function selectById(id: EntityId): Selector<State, DetailedProblem> {
    return (state) => {
      const detailedProblem = entitySelectors.selectById(state, id);
      if (!detailedProblem) {
        throw new Error('Could not find detailed problem');
      }
      return detailedProblem;
    };
  }

  export function selectByIds(
    ids: EntityId[]
  ): Selector<State, DetailedProblem[]> {
    return (state) =>
      ids.map((id) => {
        const detailedProblem = entitySelectors.selectById(state, id);
        if (!detailedProblem) {
          throw new Error('Could not find detailed problem');
        }
        return detailedProblem;
      });
  }
}
