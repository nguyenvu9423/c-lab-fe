import { Selector } from '@reduxjs/toolkit';
import { ProblemRejudge } from '@/domains/problem-rejudge/ProblemRejudge';
import { State } from './../state';
import { problemRejudgeEntityAdapter } from './../reducers/entity-reducers/problemRejudgeAdapter';

const problemRejudgeEntitySelectors = problemRejudgeEntityAdapter.getSelectors(
  (state: State) => state.entity.problemRejudge
);

export namespace ProblemRejudgeSelectors {
  export function byId(
    id: number
  ): Selector<State, ProblemRejudge | undefined> {
    return (state) => problemRejudgeEntitySelectors.selectById(state, id);
  }
}
