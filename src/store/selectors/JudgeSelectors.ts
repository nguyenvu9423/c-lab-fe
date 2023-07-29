import { State } from './../state';
import { judgeEntityAdapter } from './../reducers/entity-reducers/judgeEntityAdapter';
import { Selector } from '@reduxjs/toolkit';
import { Judge } from '@/domains/judge';

const judgeEntitySelectors = judgeEntityAdapter.getSelectors(
  (state: State) => state.entity.judge,
);

export namespace JudgeSelectors {
  export function byId(id: number): Selector<State, Judge | undefined> {
    return (state) => judgeEntitySelectors.selectById(state, id);
  }
}
