import { State } from './../../state';
import { problemEntityAdapter } from './../../reducers/entity-reducers/problemEntityAdapter';
import { Problem } from '../../../domains/problem/Problem';
import { Selector } from '@reduxjs/toolkit';

export namespace ProblemEntitySelectors {
  export interface Type {
    selectById(id): Selector<State, Problem | undefined>;

    selectByIds(ids: number[]): Selector<State, Problem[]>;
  }
}

const entitySelectors = problemEntityAdapter.getSelectors<State>(
  (state) => state.entity.problem
);

export const ProblemEntitySelectors: ProblemEntitySelectors.Type = {
  selectById(id: number) {
    return (state) => entitySelectors.selectById(state, id);
  },

  selectByIds(ids: number[]) {
    return (state) => {
      const problems: Problem[] = [];
      ids.forEach((id) => {
        const problem = entitySelectors.selectById(state, id);
        if (problem) problems.push(problem);
      });
      return problems;
    };
  },
};
