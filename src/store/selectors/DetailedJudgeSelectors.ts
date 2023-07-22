import { detailedJudgeEntityAdapter } from './../reducers/entity-reducers/detailedJudgeAdapter';
import { State } from './../state';
import { Selector } from '@reduxjs/toolkit';
import { DetailedJudge } from '@/domains/judge';

const detailedJudgeEntitySelectors = detailedJudgeEntityAdapter.getSelectors(
  (state: State) => state.entity.detailedJudge
);

export namespace DetailedJudgeSelectors {
  export function byId(id: number): Selector<State, DetailedJudge | undefined> {
    return (state) => detailedJudgeEntitySelectors.selectById(state, id);
  }
}
