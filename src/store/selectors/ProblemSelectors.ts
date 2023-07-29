import { State } from './../state';
import { Problem } from '@/domains/problem/Problem';
import { problemEntityAdapter } from './../reducers/entity-reducers/problemEntityAdapter';
import { EntityId, Selector } from '@reduxjs/toolkit';

const problemEntitySelectors = problemEntityAdapter.getSelectors(
  (state: State) => state.entity.problem,
);

export namespace ProblemSelectors {
  export function byId(id: EntityId): Selector<State, Problem> {
    return (state) => {
      const problem = problemEntitySelectors.selectById(state, id);
      if (!problem) {
        throw new Error('Could not find problem');
      }
      return problem;
    };
  }

  export function byIds(ids: EntityId[]): Selector<State, Problem[]> {
    return (state) =>
      ids.map((id) => {
        const problem = problemEntitySelectors.selectById(state, id);
        if (!problem) throw new Error('Could not find the problem');
        return problem;
      });
  }
}
