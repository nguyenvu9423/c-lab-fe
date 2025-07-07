import { Selector } from '@reduxjs/toolkit';
import { State } from '../state';
import { contestProblemRejudgeEntityAdapter } from '../reducers/entity-reducers/contestProblemRejudgeEntityAdapter';
import { ContestProblemRejudge } from '@/domains/contest';

const problemRejudgeEntitySelectors =
  contestProblemRejudgeEntityAdapter.getSelectors(
    (state: State) => state.entity.contestProblemRejudge,
  );

export namespace ContestProblemRejudgeSelectors {
  export function byId(
    id: number,
  ): Selector<State, ContestProblemRejudge | undefined> {
    return (state) => problemRejudgeEntitySelectors.selectById(state, id);
  }
}
